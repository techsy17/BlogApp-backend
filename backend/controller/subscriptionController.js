import Subscription from "../models/subscription.js";

const createSubscription = async (req, res) => {
    try {
        const { blogCreatorId, subscriptionType } = req.body;
        const subscriberId = req.user._id;

        if (subscriberId === blogCreatorId) {
            return res.status(400).json({ message: "You cannot take Subscription of Yourself!" })
        }

        const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                                                                                                                                                    
        const subscription = await Subscription.create({
            subscriberId: subscriberId,
            blogCreatorId,
            subscriptionType,
            subscriptionExpiryDate: expiryDate,
            isActive: true
        })

        if (!subscription) {
            return res.status(400).message({ message: "Subscription Creation Failed..." })
        }

        res.status(201).json({ message: "Subscription Created Successfully", subscription });

    } catch (error) {
        res.status(500).json({ message: "Server not responding..", error: error.message })
    }
}

export { createSubscription }; 