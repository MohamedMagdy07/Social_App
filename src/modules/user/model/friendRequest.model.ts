import {model, Schema, Types} from 'mongoose';
import {IFriendRequest} from "../interfaces/friendrequest.interface";

const friendRequestSchema = new Schema<IFriendRequest>({
        senderId: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
        receiverId: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
    },
    {
        timestamps: true,
        strict: true
    })

export const FriendRequest = model<IFriendRequest>('FriendRequest', friendRequestSchema);