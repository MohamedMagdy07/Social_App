import {Router} from 'express';
import {getALlUsers} from "./controller/user.controller";
import {withCache} from "../../common/lib/cache/withCache";

export const userRouter = Router()

userRouter.get('/getAllUsers', withCache(300), getALlUsers);
