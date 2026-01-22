import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogSubType: {
        type: String,
        enum: ['free', 'bronze', 'silver', 'gold'],
        default: 'free'
    }
}, { timestamps: true });

const Blogs = mongoose.model('Blogs', blogSchema);

export default Blogs;