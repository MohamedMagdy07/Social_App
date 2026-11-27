import {Comment} from "../model/comment.model";
import {IComment} from "../interfaces/comment.interface";
import {QueryFilter} from "mongoose";
import {DBAbstract} from "../../../common/lib/db/db.abstract";

class CommentRepository extends DBAbstract<IComment> {

    constructor() {
        super(Comment);
    }

    async getCommentsByPost(postId: string) {
        return await Comment.find({postId, isDeleted: false});
    }

    async getCommentsByUser(userId: string) {
        return await Comment.find({userId, isDeleted: false});
    }

    async getOne(filter: QueryFilter<IComment>) {
        return await Comment.findOne(filter);
    }

    async findCommentById(id: string) {
        return await Comment.findOne({_id: id, isDeleted: false});
    }

    async updateComment(filter: QueryFilter<IComment>, data: Partial<IComment>) {
        return await Comment.findOneAndUpdate(filter, {$set: data}, {new: true});
    }

    async softDelete(id: string, userId: string) {
        return await Comment.findOneAndUpdate(
            {_id: id, userId, isDeleted: false},
            {$set: {isDeleted: true}},
            {new: true}
        );
    }

}

export default new CommentRepository();
