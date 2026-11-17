import {Expression, model, Schema} from 'mongoose';
import {partial} from "zod/mini";
import {IUser} from "../interfaces/user.interface";
import {Gender, Provider} from "../../../common/lib/enum";

const userSchema = new Schema<IUser>({
        userName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: function (this:IUser) {
                return this.provider === Provider.LOCAL;
            },

        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: Number,
            enum: Gender,
            default: Gender.MALE,
        },
        provider: {
            type: Number,
            default: Provider.LOCAL ,
            enum: Provider ,
        },
        twoStepVerification: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        strict: true
    })

export const User = model<IUser>('User', userSchema);