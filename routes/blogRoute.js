import express from 'express';
import { addBlog, deleteBlog, deleteMyBlog, getAllBlogs, getBlog, getMyBlog, getMyBlogs, updateBlog, updateMyBlog } from '../controller/blogController.js';
import { authorized } from '../middleware/userMiddleware.js';
import { authorizedSubscription } from '../middleware/subscriptionMiddleware.js';

const router = express.Router();


// All Blogs 
router.post('/add',authorized,addBlog);
router.get('/blogs',getAllBlogs);
router.get('/blogs/:id',getBlog);
// router.get('/blogs/:id',authorized,authorizedSubscription,getBlog);
// router.delete('/blogs/:id',deleteBlog);
// router.put('/blogs/:id',updateBlog);

// My Blogs 
router.get('/myblogs',authorized,getMyBlogs);
router.get('/myblogs/:id',authorized,getMyBlog);
router.delete('/myblogs/:id',authorized,deleteMyBlog)
router.put('/myblogs/:id',authorized,updateMyBlog);


export default router;