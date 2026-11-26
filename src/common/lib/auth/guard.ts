import jwt from "jsonwebtoken";
import {env} from "../config/env";
import {AppError} from "../../pkg/error/error";
import {NextFunction, Request, Response} from "express";
import {IUserPayload} from "../interfaces/userPayload.interface";

export function authGuard(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) return next(new AppError('no token provided', 403));
    try {
        req.user = jwt.verify(token, env.jwt.secret) as IUserPayload;
        next();
    } catch (error) {
        next(error);
    }
}
