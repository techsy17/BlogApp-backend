import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    eventName: {
        type: String,
    },
    blogCreatorId: {
        type: String
    },
    subscriberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriberName: {
        type: String
    },
    subscriberEmail: {
        type: String
    },
    subscriptionType: {
        type: String
    },
    orderId: {
        type: String
    },
    webhookId: {
        type: String
    },
    currency:{
        type: String
    },
    total: {
        type: String
    },
    createdAt: {
        type: String
    },
    webhookDataLog: {
        type: Object,
        required: true
    }

},{timestamps: true})

const Payment = mongoose.model('Payment',paymentSchema);

export default Payment;