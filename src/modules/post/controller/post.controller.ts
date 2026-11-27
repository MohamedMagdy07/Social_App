import {NextFunction, Request, Response} from "express";
import postService, {PostService} from "../service/post.service";

class PostController {
    private postService: PostService = postService;

    constructor() {
    }

    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const post = await this.postService.createPost(req.body, userId);
            res.status(201).json({message: "Post created successfully", success: true, data: post});
        } catch (err) {
            next(err);
        }
    }

    getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.getAllPosts();
            res.status(200).json({message: "Posts fetched successfully", success: true, data: posts});
        } catch (err) {
            next(err);
        }
    }

    getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const posts = await this.postService.getMyPosts(userId);
            res.status(200).json({message: "Posts fetched successfully", success: true, data: posts});
        } catch (err) {
            next(err);
        }
    }

    getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await this.postService.getPostById(req.params.id as string);
            res.status(200).json({message: "Post fetched successfully", success: true, data: post});
        } catch (err) {
            next(err);
        }
    }

    updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const post = await this.postService.updatePost(req.params.id as string, req.body, userId);
            res.status(200).json({message: "Post updated successfully", success: true, data: post});
        } catch (err) {
            next(err);
        }
    }

    deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            await this.postService.deletePost(req.params.id as string, userId);
            res.status(200).json({message: "Post deleted successfully", success: true});
        } catch (err) {
            next(err);
        }
    }

}

export default new PostController();
