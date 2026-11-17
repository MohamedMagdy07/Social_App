import {Gender, Provider} from "../../../common/lib/enum";


export interface IUser {
    userName:string;
    email:string;
    password:string;
    provider:Provider;
    gender:Gender;
    isDeleted?:boolean;
    isVerified?:boolean;
    dateOfBirth?:Date;
    twoStepVerification:boolean

}