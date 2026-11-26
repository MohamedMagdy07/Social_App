import userRepository from "../repository/user.repository";
import { IUser } from "../interfaces/user.interface";

export class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return await userRepository.getAllUsers();
    }
}

const userService = new UserService();
export default userService;

// Export standalone function for backward compatibility
export const getAllUsers = async (): Promise<IUser[]> => {
    return await userService.getAllUsers();
};
