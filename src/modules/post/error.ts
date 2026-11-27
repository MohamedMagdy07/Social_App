import {AppError} from "../../common/pkg/error/error";

export const postNotFound = new AppError("Post not found", 404);
export const notPostOwner = new AppError("You are not the owner of this post", 403);
