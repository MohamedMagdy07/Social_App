import {Router} from "express";
import authController from "./controller/auth.controller";


export const authRouter = Router();


authRouter.post('/register',authController.register);
authRouter.patch('/login',authController.verifyAccount);

authRouter.post('/login',authController.login);