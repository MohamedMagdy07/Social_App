export * from "./comment.dto";

export interface CreateCommentDto {
    content: string;
    postId: string;
}

export interface UpdateCommentDto {
    content: string;
}
