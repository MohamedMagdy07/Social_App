import * as postContorller from "./controller/post.controller.js"
import {Router} from "express";
import {guard} from "../../lib/auth/guard.js";

export const postRouter = Router();

postRouter.post("/", postContorller.sendpost)

postRouter.post("/public",guard, postContorller.sendpost)

postRouter.get("/myposts",guard, postContorller.getAllposts)


