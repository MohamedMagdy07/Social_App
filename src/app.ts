import express from 'express';
import './common/lib/db/connections'
import {globalErrorHandler} from "./common/lib/error/global.error.handler";
import {correlationId} from "./common/lib/correlation/correlationId";
import cookieParser from "cookie-parser";
import {authRouter} from "./modules/auth/auth.route";
import {userRouter} from "./modules/user/user.route";


export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(correlationId);
    app.use(cookieParser());
    app.use('/auth', authRouter);
    app.use('/users', userRouter);

    app.use(globalErrorHandler);
    return app;
}
