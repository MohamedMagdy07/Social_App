import {z} from "zod";

export const createCommentDTO = z.object({
    content: z.string().trim().min(5).max(500),
    postId: z.string(),
}).strict();

export type CreateCommentDto = z.infer<typeof createCommentDTO>;

export const updateCommentDTO = z.object({
    content: z.string().trim().min(5).max(500),
}).strict();

export type UpdateCommentDto = z.infer<typeof updateCommentDTO>;
