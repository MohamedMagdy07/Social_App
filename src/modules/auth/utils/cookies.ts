import { Response, CookieOptions } from "express";
import {convertToMs, Time} from "../../../common/pkg/utils/TimeConversion";


export const ACCESS_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    maxAge: convertToMs(1,Time.HOURS), // 1 hour in ms
    path: "/",
};

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    maxAge: convertToMs(7,Time.DAYS), // 1 hour in ms
    path: "/auth/refresh-token",
};


export function setCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
): void {
    res.cookie("access_token", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie("refresh_token", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
}

export function clearCookies(res: Response): void {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/auth/refresh-token" });
}
