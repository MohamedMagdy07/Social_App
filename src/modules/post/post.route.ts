import {Router} from "express";
import postController from "./controller/post.controller";
import {authGuard} from "../../common/lib/auth/guard";

export const postRouter = Router();

postRouter.post("/create", authGuard, postController.createPost);
postRouter.get("/getAll", postController.getAllPosts);
postRouter.get("/getMine", authGuard, postController.getMyPosts);
postRouter.get("/get/:id", postController.getPostById);
postRouter.patch("/update/:id", authGuard, postController.updatePost);
postRouter.delete("/delete/:id", authGuard, postController.deletePost);
