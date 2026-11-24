import {Router} from 'express';
import {withCache} from "../../lib/cache/withCache.ts";
import {getALlUsers} from "./controller/user.controller";

export const userRouter = Router()

userRouter.get('/getAllUsers', withCache(300), getALlUsers);
