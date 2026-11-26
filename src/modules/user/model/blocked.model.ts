import {model, Schema, Types} from 'mongoose';
import {IBlockList} from "../interfaces/blocklist.interface";

const blockedSchema = new Schema<IBlockList>({
        userId: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
        blockedUserId: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        strict: true
    })

export const BlockList = model<IBlockList>('BlockList', blockedSchema);