import {model, Schema} from 'mongoose';
import {IFriendList} from "../interfaces/friendlist.interface";

const friendSchema = new Schema<IFriendList>({
        friends: {
            type:[{type:Schema.Types.ObjectId, ref:'User'}],
            length:2
        },
    },
    {
        timestamps: {
            updatedAt:false,
            createdAt:true,
        },
        strict: true
    })

export const Friend = model('Friend', friendSchema);