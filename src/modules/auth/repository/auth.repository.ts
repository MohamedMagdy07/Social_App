import { User } from "../../user/model/user.model";
import {IUser} from  "../../user/interfaces/user.interface";



class AuthRepository {

    constructor() {

    }

    async checkEmailExists(email: string): Promise<boolean> {
        const user = await User.exists({ email });
        return Boolean(user);
    }



    async verifyUser(email: string) {
        return User.updateOne({ email }, { isVerified: true });
    }

    async enable2StepVerification(email: string) {
        return User.find({ email }, { twoStepVerification: true });
    }
}

export default new AuthRepository();