import {Friend} from "../model/friends.model";
import {DBAbstract} from "../../../common/lib/db/db.abstract";
import {IFriendList} from "../interfaces/friendlist.interface";

export class FriendsRepository extends DBAbstract<IFriendList> {
    constructor() {
        super(Friend);
    }
}

export default new FriendsRepository();
