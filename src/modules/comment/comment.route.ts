import {Router} from "express";
import commentController from "./controller/comment.controller";
import {authGuard} from "../../common/lib/auth/guard";

export const commentRouter = Router();

commentRouter.post("/create", authGuard, commentController.createComment);
commentRouter.get("/post/:postId", commentController.getCommentsByPost);
commentRouter.get("/getMine", authGuard, commentController.getMyComments);
commentRouter.patch("/update/:id", authGuard, commentController.updateComment);
commentRouter.delete("/delete/:id", authGuard, commentController.deleteComment);
