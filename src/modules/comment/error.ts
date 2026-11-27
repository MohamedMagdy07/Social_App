import {AppError} from "../../common/pkg/error/error";

export const commentNotFound = new AppError("Comment not found", 404);
export const notCommentOwner = new AppError("You are not the owner of this comment", 403);
