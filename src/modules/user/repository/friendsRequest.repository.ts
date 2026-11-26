import {FriendRequest} from "../model/friendRequest.model";
import {DBAbstract} from "../../../common/lib/db/db.abstract";
import {IFriendRequest} from "../interfaces/friendrequest.interface";

export class FriendsRequestRepository extends DBAbstract<IFriendRequest>{
    constructor() {
        super(FriendRequest)
    }
}