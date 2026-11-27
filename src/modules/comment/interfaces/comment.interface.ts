export interface IComment {
    content: string;
    userId: string;
    postId: string;
    isDeleted?: boolean;
}
