import {model, Schema} from "mongoose";
import {IPost} from "../interfaces/post.interface";

const postSchema = new Schema<IPost>({
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
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        strict: true
    })


export const Post = model<IPost>("Post", postSchema);
