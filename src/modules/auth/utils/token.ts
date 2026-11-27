import jwt, {SignOptions} from "jsonwebtoken";
import {env} from "../../../common/lib/config/env";

export async function generateToken(
    data: Record<string, any>,
    expiresIn: SignOptions["expiresIn"]
): Promise<string> {
    const token = jwt.sign(
        {
            ...data,
        },
        env.jwt.secret,
        {expiresIn}
    );
    return token;
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, env.jwt.secret);
}

