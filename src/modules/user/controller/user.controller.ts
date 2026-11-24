import { Request, Response, NextFunction } from "express";
import userService, { UserService } from "../service/user.service";

export class UserController {
    private userService: UserService = userService;

    getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({
                message: "Users fetched successfully",
                success: true,
                data: users
            });
        } catch (err) {
            next(err);
        }
    };
}

const userController = new UserController();
export default userController;

// Export standalone function for compatibility with existing imports
export const getALlUsers = userController.getAllUsers;
