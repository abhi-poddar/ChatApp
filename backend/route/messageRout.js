import express from 'express';
import { sendMessage } from '../routeControllers/messageController.js';
import isLogin from '../middleware/isLogin.js';
import { getMessages } from '../routeControllers/messageController.js';

const router = express.Router();

router.post('/send/:id',isLogin ,sendMessage);
router.get('/:id',isLogin ,getMessages);

export default router;