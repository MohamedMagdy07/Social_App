import {z} from "zod";

export const createPostDTO = z.object({
    content: z.string().trim().min(5).max(500),
}).strict();

export type CreatePostDto = z.infer<typeof createPostDTO>;

export const updatePostDTO = z.object({
    content: z.string().trim().min(5).max(500),
}).strict();

export type UpdatePostDto = z.infer<typeof updatePostDTO>;
