import axios from "axios";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";
import Subscription from "../models/subscription.js";
import Blogs from "../models/blogModel.js";

const createCheckout = async (req, res) => {
    try {
        const subscriberId = req.user._id;

        const { blogCreatorId, subscriptionType } = req.body;

        const token = req.headers.authorization?.split(' ')[1];

        const subscriptionOption = {
            bronze: process.env.BRONZE_SUBSCRIPTION_PRODUCT_ID,
            silver: process.env.SILVER_SUBSCRIPTION_PRODUCT_ID,
            gold: process.env.GOLD_SUBSCRIPTION_PRODUCT_ID
        };

        const product = subscriptionOption[subscriptionType];
        if (!product) {
            return res.status(400).json({ message: "Subscription not found..." });
        }

        if (!token) {
            return res.status(400).json({ message: "User not authenticated.." })
        }

        const creatorBlogs = await Blogs.find({userId: blogCreatorId});
        if (!creatorBlogs) {
            return res.status(404).json({ message: "Creator has no Blog or Creator not Found.." });
        }
  
        if (subscriberId === blogCreatorId) {
            return res.status(400).json({ message: "You cannot subscribe to your own blog." });
        }

        const response = await axios.post(
            "https://api.lemonsqueezy.com/v1/checkouts",
            {
                data: {
                    type: "checkouts",
                    attributes: {
                        checkout_data: {
                            custom: {
                                subscriberId,
                                blogCreatorId: blogCreatorId,
                                subscriptionType,
                                userToken: token
                            }
                        }
                    },
                    relationships: {
                        store: {
                            data: {
                                type: "stores",
                                id: process.env.LEMON_SQUEEZY_STORE_ID
                            }
                        },
                        variant: {
                            data: {
                                type: "variants",
                                id: product
                            }
                        }
                    }
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
                }
            }
        );

        const checkoutUrl = response.data.data.attributes.url;
        const checkoutId = response.data.data.id;


         const order = await Order.create({
            subscriberId,
            blogCreatorId,
            subscriptionType,
            checkoutId,
            checkoutUrl,
            status: 'pending'
        });

        if (!order) {
            return res.status(400).json({ message: "Order not created, Something went wrong.." });
        }

        console.log("Subscription Order Created Successfully");
        return res.status(201).json({ checkoutId, checkoutUrl });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!!!" });
        console.log(error)
    }
};

const webhookData = async (req, res) => {
    try {
        const wholeData = req.body;
        const subscriberId = wholeData.meta.custom_data.subscriberId;
        const blogCreatorId = wholeData.meta.custom_data.blogCreatorId;
        const webhook_id = wholeData.meta.webhook_id;
        const subsType = wholeData.meta.custom_data.subscriptionType;

        if (!subscriberId) {
            return res.status(400).json({ message: "Subscriber not found by these ID.." })
        }

         const order = await Order.findOne({
            subscriberId,
            blogCreatorId,
            subscriptionType: subsType,
            status: 'pending'
        });
        if (!order) {
            return res.status(400).json({ message: "Order not found with these SubsciberId or Somenthing went wrong during order creation..." })
        }

        const payment = await Payment.create({
            eventName: wholeData.meta.event_name,
            blogCreatorId: wholeData.meta.custom_data.blogCreatorId,
            subscriberId: wholeData.meta.custom_data.subscriberId,
            subscriberName: wholeData.data.attributes.subscriberName,
            subscriberEmail: wholeData.data.attributes.subscriberEmail,
            subscriptionType: wholeData.meta.subscriptionType,
            orderId: wholeData.data.id,
            webhookId: webhook_id,
            currency: wholeData.data.attributes.currency,
            total: wholeData.data.attributes.total_formatted,
            createdAt: new Date(wholeData.data.attributes.created_at),
            webhookDataLog: wholeData
        });


        order.orderId = payment.orderId;
        order.paymentId = payment._id;
        order.webhookId = payment.webhookId;
        order.status = 'paid';
        await order.save();


        if (subscriberId === blogCreatorId) {
            return res.status(400).json({ message: "You cannot take Subscription of Yourself" });
        }

        const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const subscription = await Subscription.create({
            subscriberId,
            blogCreatorId,
            subscriptionType: subsType,
            subscriptionExpiryDate: expiryDate
        });

        if (!subscription) {
            return res.status(400).json({ message: "Subscription not activated, something went wrong" })
        }

        res.status(200).json({ message: `Payment done Successfully for OrderId: ${payment.orderId}`, message1: "Subscription Activated Successfully" });
        // res.status(200).json({message: `Payment done Successfully for OrderId: ${payment.orderId}`});
        console.log("Order Updated Successfully");


    } catch (error) {
        console.error("Something went wrong!", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { createCheckout, webhookData };