import {JwtPayload} from "jsonwebtoken";
import {IUser} from "../../../modules/user/interfaces/user.interface";

export interface IUserPayload extends JwtPayload, Partial<IUser> {
    id?: string;
}