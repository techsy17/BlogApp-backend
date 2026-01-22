import express from 'express';
import { createSubscription } from '../controller/subscriptionController.js';
import {authorized} from '../middleware/userMiddleware.js';
import { authorizedSubscription } from '../middleware/subscriptionMiddleware.js';
import { addSubscriptedBlog, getAllSubscriptedBlogs, getSubscriptedBlog} from '../controller/subscriptedBlogController.js';

const router = express.Router()

router.post('/subscription',authorized,createSubscription);
router.get('/subscripted-blog/:id',authorized,authorizedSubscription,getSubscriptedBlog);
router.get('/subscripted-allblog/:type',authorized,getAllSubscriptedBlogs);
router.post('/addblog-subscripted',authorized,addSubscriptedBlog);

export default router;