import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    subscriberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    blogCreatorId: {
        type: String
    },
    subscriptionType: {
        type: String
    },
    checkoutId: {
        type: String
    },
    checkoutUrl: {
        type: String
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },
    webhookId: {
        type: String
    },
    status: {
        type: String,
        enum: ['paid', 'failed', 'pending'],
        default: 'pending'
    }
}, { timestamps: true })


const Order = mongoose.model('Order', orderSchema);
export default Order;