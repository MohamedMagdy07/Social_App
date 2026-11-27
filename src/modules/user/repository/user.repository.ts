import {User} from '../model/user.model';
import {IUser} from "../interfaces/user.interface";
import {QueryFilter, Types} from "mongoose";
import {DBAbstract} from "../../../common/lib/db/db.abstract";

class UserRepository extends DBAbstract<IUser> {

    constructor() {
        super(User);
    }

    async getAllUsers() {
        return await User.find();
    }

    async getOne(filter:QueryFilter<IUser>) {
        return await User.findOne(filter, {password: 0});
    }

    async findUserById(id: Types.ObjectId) {
        return await User.findOne({_id: id, isDeleted: false}, {password: 0});
    }
    async updateUser(filter: QueryFilter<IUser>, data: Partial<IUser>) {
        return await User.findOneAndUpdate(filter, { $set: data }, { new: true });
    }

}

export default new UserRepository();