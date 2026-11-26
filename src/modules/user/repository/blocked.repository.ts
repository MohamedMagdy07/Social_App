import {BlockList} from "../model/blocked.model";
import {DBAbstract} from "../../../common/lib/db/db.abstract";
import {IBlockList} from "../interfaces/blocklist.interface";

export class BlockedRepository extends DBAbstract <IBlockList>{
    constructor() {
        super(BlockList)
    }
}