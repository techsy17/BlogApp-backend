import Blog from '../models/blogModel.js';
import Subscription from '../models/subscription.js';

const authorizedSubscription = async (req, res, next) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({ success: false, message: "Blogs Not Found..." })
        }

        // console.log(blog.userId);
        // console.log(req.user._id);

        if (blog.userId.equals(req.user._id)) {
            req.blog = blog;
            return next();
        }

        if (blog.blogSubType === 'free') {
            req.blog = blog;
            console.log(req.blog);
            return next();
        }

        const subscription = await Subscription.findOne({
            subscriberId: req.user._id,
            blogCreatorId: blog.userId,
            subscriptionType: blog.blogSubType,
            isActive: true,
            subscriptionExpiryDate: { $gt: new Date() }
        });

        console.log(subscription);

        if (!subscription) {
            req.blog = {
                title: blog.title,
                body: null,
                author: blog.author,
                userId: blog.userId,
                blogSubType: blog.blogSubType
            };
            return next();
        }

        req.blog = blog;
        console.log("Subscripted Blogs: ", req.blog);
        next();

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}

export { authorizedSubscription };