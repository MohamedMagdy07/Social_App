import {Types} from "mongoose";

export interface IFriendRequest {
    senderId: string | Types.ObjectId,
    receiverId: string | Types.ObjectId,
    createdAt: Date,
}

