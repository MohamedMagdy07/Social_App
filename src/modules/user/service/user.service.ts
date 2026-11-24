import userRepository from "../repository/user.repository";
import { AppError } from "../../../common/pkg/error/error";
import { IUser } from "../interfaces/user.interface";

export class UserService {
    async getAllUsers(): Promise<IUser[]> {
        const users = await userRepository.getAllUsers();
        return users;
    }
}

const userService = new UserService();
export default userService;

// Export standalone function for backward compatibility
export const getAllUsers = async (): Promise<IUser[]> => {
    return await userService.getAllUsers();
};
