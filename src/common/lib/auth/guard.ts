import jwt from "jsonwebtoken";
import {env} from "../config/env";
import {AppError} from "../../pkg/error/error";
import {NextFunction, Request, Response} from "express";
import {IUserPayload} from "../interfaces/userPayload.interface";

export function authGuard(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.access_token;
        if (!token) throw new AppError('no token provided', 403);
        req.user = jwt.verify(token, env.jwt.secret) as IUserPayload;
        next();
    } catch (error) {
        next(error);
    }
}