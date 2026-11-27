import {z} from "zod";

export const createCommentDTO = z.object({
    content: z.string().trim().min(5).max(500),
    postId: z.string(),
}).strict();

export const updateCommentDTO = z.object({
    content: z.string().trim().min(5).max(500),
}).strict();

