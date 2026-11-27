import {NextFunction, Request, Response} from "express";
import authService, {AuthService} from "../service/auth.service";
import {clearCookies, setCookies} from "../utils/cookies";
import {AppError} from "../../../common/pkg/error/error";


class AuthController {
    private authService: AuthService = authService;

    constructor() {
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(200).json({message: "User Created successfully", success: true, data: user});

        } catch (err) {
            next(err);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokens = await this.authService.login(req.body);
            setCookies(res, tokens.accessToken, tokens.refreshToken);
            res.status(200).json({
                message: "User logged in successfully",
                success: true,
                data: {
                    accessToken: tokens.accessToken,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authService.verifyAccount(req.body);
            res.json({
                message: "user verify successfully", success: true,
            })
        } catch (err) {
            next(err);
        }
    }

    sendOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.sendOtp(req.body);
            res.status(200).json({
                message: "OTP sent successfully",
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.resetPassword(req.body);
            res.status(200).json({
                message: "Password reset successfully",
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refresh_token;
            if (!token) return next(new AppError("No refresh token provided", 401));
            const tokens = await this.authService.refreshToken(token);
            setCookies(res, tokens.accessToken, tokens.refreshToken);
            res.status(200).json({
                message: "Token refreshed successfully",
                success: true,
                data: {
                    accessToken: tokens.accessToken,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            clearCookies(res);
            res.status(200).json({message: "Logged out successfully", success: true});
        } catch (err) {
            next(err);
        }
    }

}


export default new AuthController();
