import {model, Schema} from "mongoose";


const postSchema = new Schema({
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


export const post = model("post", postSchema);