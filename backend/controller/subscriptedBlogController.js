import Blogs from "../models/blogModel.js";
import Subscription from "../models/subscription.js";

const getSubscriptedBlog = async (req, res) => {
    try {
        const blog = req.blog;
        // res.status(200).json({ success: true, blog });
        res.status(200).json(blog);

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, please try again!!", error: error.message });
    }
}

const getAllSubscriptedBlogs = async (req, res) => {
    try {
        const type = req.params.type;
        const subscriptions = await Subscription.find({
            subscriberId: req.user._id,
            isActive: true,
            subscriptionType: type,
            subscriptionExpiryDate: { $gt: new Date() }
        });

        if (!subscriptions) {
            return res.status(400).json({ message: "No active subscriptions found" });
        }
        res.status(200).json({ success: true, message: "All Subscripted Blogs :-", subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, please try again!!", error: error.message });
    }
}

const addSubscriptedBlog = async (req, res) => {
    try {
        const { title, body, blogSubType } = req.body;
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauhtorized, Please Login First!" })
        }
        const addBlog = await Blogs.create({ title, body, author: req.user.username, userId: req.user._id, blogSubType });
        if (!addBlog) {
            return res.status(400).json({ success: false, message: "Blog not created, Something went wrong!" })
        }
        res.status(200).json({ success: true, message: "Blog Added Successfully", addBlog, user: req.user });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, please try again!!", error: error.message });
    }
};


export { getSubscriptedBlog, addSubscriptedBlog, getAllSubscriptedBlogs }