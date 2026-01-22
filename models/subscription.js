import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogCreatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ['bronze','silver','gold'],
        required: true
    },
    subscriptionExpiryDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true});


const Subscription = mongoose.model('Subscription',subscriptionSchema);
export default Subscription;