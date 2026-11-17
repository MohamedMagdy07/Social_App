import * as userRepo from "../repository/user.repository.ts";
import {AppError} from "../../../pkg/error/error.ts";

export async function getAllUsers() {
    const users = await userRepo.getAllUsers();
    // if (!users) {
    //     throw new AppError("No users found.",'404');
    // }
    return users;
}