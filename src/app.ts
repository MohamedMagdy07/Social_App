import express from 'express';
import './common/lib/db/connections'
import {globalErrorHandler} from "./common/lib/error/global.error.handler";
import {correlationId} from "./common/lib/correlation/correlationId";
import cookieParser from "cookie-parser";
import {authRouter} from "./modules/auth/auth.route";
import {userRouter} from "./modules/user/user.route";
import {postRouter} from "./modules/post/post.route";
import {commentRouter} from "./modules/comment/comment.route";


export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(correlationId);
    app.use(cookieParser());
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/comments', commentRouter);

    app.use(globalErrorHandler);
    return app;
}


// I did add a lot of functionality, but I may or mayn't be able to finish it.
// I wish for you to wait for me to finish all the requirement as soon as possible