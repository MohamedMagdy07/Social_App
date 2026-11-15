import {model, Schema} from "mongoose";


const commentSchema = new Schema({
        content: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 500,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        strict: true
    })


export const comment = model("comment", commentSchema);