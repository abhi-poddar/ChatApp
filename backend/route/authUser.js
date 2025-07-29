import express from 'express';
import { userRegister,userLogin,userLogOut } from '../routeControllers/userController.js';

const router = express.Router();

router.post('/register',userRegister)

router.post('/login',userLogin)

router.post('/logout',userLogOut)

export default router;