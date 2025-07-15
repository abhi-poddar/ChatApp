import express from 'express';
import { userRegister } from '../routeControllers/userController.js';
import { userLogin } from '../routeControllers/userController.js';
import { userLogOut } from '../routeControllers/userController.js';
const router = express.Router();
router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/logout',userLogOut)

export default router;