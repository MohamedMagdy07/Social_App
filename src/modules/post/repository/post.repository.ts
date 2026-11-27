import {Post} from "../model/post.model";
import {IPost} from "../interfaces/post.interface";
import {QueryFilter} from "mongoose";
import {DBAbstract} from "../../../common/lib/db/db.abstract";

class PostRepository extends DBAbstract<IPost> {

    constructor() {
        super(Post);
    }

    async getAllPosts() {
        return await Post.find({isDeleted: false});
    }

    async getPostsByUser(userId: string) {
        return await Post.find({userId, isDeleted: false});
    }

    async getOne(filter: QueryFilter<IPost>) {
        return await Post.findOne(filter);
    }

    async findPostById(id: string) {
        return await Post.findOne({_id: id, isDeleted: false});
    }

    async updatePost(filter: QueryFilter<IPost>, data: Partial<IPost>) {
        return await Post.findOneAndUpdate(filter, {$set: data}, {new: true});
    }

    async softDelete(id: string, userId: string) {
        return await Post.findOneAndUpdate(
            {_id: id, userId, isDeleted: false},
            {$set: {isDeleted: true}},
            {new: true}
        );
    }

}

export default new PostRepository();
