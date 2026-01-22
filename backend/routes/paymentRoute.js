import express from 'express';
import { authorized } from '../middleware/userMiddleware.js';
import { createCheckout, webhookData } from '../controller/paymentController.js';

const router = express.Router();

router.post('/blog-subscription',authorized,createCheckout);
router.post('/blog-subscription-webhook',webhookData);

export default router;