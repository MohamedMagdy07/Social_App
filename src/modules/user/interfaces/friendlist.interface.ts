import {Types} from "mongoose";

export interface IFriendList {
    friends: string[]|Types.ObjectId[],
    createdAt:Date,
}

