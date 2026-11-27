import {NextFunction, Request, Response} from "express";
import commentService, {CommentService} from "../service/comment.service";

class CommentController {
    private commentService: CommentService = commentService;

    constructor() {
    }

    createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const comment = await this.commentService.createComment(req.body, userId);
            res.status(201).json({message: "Comment created successfully", success: true, data: comment});
        } catch (err) {
            next(err);
        }
    }

    getCommentsByPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comments = await this.commentService.getCommentsByPost(req.params.postId as string);
            res.status(200).json({message: "Comments fetched successfully", success: true, data: comments});
        } catch (err) {
            next(err);
        }
    }

    getMyComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const comments = await this.commentService.getMyComments(userId);
            res.status(200).json({message: "Comments fetched successfully", success: true, data: comments});
        } catch (err) {
            next(err);
        }
    }

    updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            const comment = await this.commentService.updateComment(req.params.id as string, req.body, userId);
            res.status(200).json({message: "Comment updated successfully", success: true, data: comment});
        } catch (err) {
            next(err);
        }
    }

    deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id!;
            await this.commentService.deleteComment(req.params.id as string, userId);
            res.status(200).json({message: "Comment deleted successfully", success: true});
        } catch (err) {
            next(err);
        }
    }

}

export default new CommentController();
