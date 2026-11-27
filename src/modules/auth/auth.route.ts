import {Router} from "express";
import authController from "./controller/auth.controller";


export const authRouter = Router();


authRouter.post('/register', authController.register);
authRouter.patch('/login', authController.verifyAccount);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/send-otp', authController.sendOtp);
authRouter.post('/reset-password', authController.resetPassword);
