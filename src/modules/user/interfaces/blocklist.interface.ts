import { Types} from "mongoose";

export interface IBlockList{
    userId:string|Types.ObjectId,
    blockedUserId: string|Types.ObjectId,
    createdAt:Date,
}