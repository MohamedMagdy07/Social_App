import postRepository from "../repository/post.repository";
import type {CreatePostDto, UpdatePostDto} from "../dto";
import {notPostOwner, postNotFound} from "../error";

export class PostService {

    async createPost(dto: CreatePostDto, userId: string) {
        return await postRepository.create({...dto, userId});
    }

    async getAllPosts() {
        return await postRepository.getAllPosts();
    }

    async getMyPosts(userId: string) {
        return await postRepository.getPostsByUser(userId);
    }

    async getPostById(id: string) {
        const post = await postRepository.findPostById(id);
        if (!post) throw postNotFound;
        return post;
    }

    async updatePost(id: string, dto: UpdatePostDto, userId: string) {
        const post = await postRepository.findPostById(id);
        if (!post) throw postNotFound;
        if (post.userId.toString() !== userId.toString()) throw notPostOwner;
        return await postRepository.updatePost({_id: id}, dto);
    }

    async deletePost(id: string, userId: string) {
        const deleted = await postRepository.softDelete(id, userId);
        if (!deleted) throw postNotFound;
        return deleted;
    }

}

export default new PostService();
