import {model, Schema} from "mongoose";
import {IComment} from "../interfaces/comment.interface";

const commentSchema = new Schema<IComment>({
        content: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 500,
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        strict: true
    })


export const Comment = model<IComment>("Comment", commentSchema);
