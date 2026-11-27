import commentRepository from "../repository/comment.repository";
import {CreateCommentDto, UpdateCommentDto} from "../dto/comment.dto";
import {commentNotFound, notCommentOwner} from "../error";
import {postNotFound} from "../../post/error";
import postRepository from "../../post/repository/post.repository";

export class CommentService {

    async createComment(createCommentDto: CreateCommentDto, userId: string) {
        const post = await postRepository.findPostById(createCommentDto.postId);
        if (!post) throw postNotFound;
        return await commentRepository.create({
            content: createCommentDto.content,
            userId,
            postId: createCommentDto.postId,
        });
    }

    async getCommentsByPost(postId: string) {
        return await commentRepository.getCommentsByPost(postId);
    }

    async getMyComments(userId: string) {
        return await commentRepository.getCommentsByUser(userId);
    }

    async updateComment(id: string, dto: UpdateCommentDto, userId: string) {
        const comment = await commentRepository.findCommentById(id);
        if (!comment) throw commentNotFound;
        if (comment.userId.toString() !== userId.toString()) throw notCommentOwner;
        return await commentRepository.updateComment({_id: id}, dto);
    }

    async deleteComment(id: string, userId: string) {
        const deleted = await commentRepository.softDelete(id, userId);
        if (!deleted) throw commentNotFound;
        return deleted;
    }

}

export default new CommentService();
