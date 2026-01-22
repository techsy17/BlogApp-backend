import express from 'express';
const router = express.Router();
import { home, login, register } from '../controller/userController.js';
import { authorized } from '../middleware/userMiddleware.js';

router.post('/register',register);
router.post('/login',login);
router.post('/home',authorized,home)


export default router;
