import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../../common/lib/config/env";

export async function generateToken(
    data: Record<string, any>,
    expiresIn: SignOptions["expiresIn"]
): Promise<string> {
    const token = jwt.sign(
        {
            ...data,
        },
        env.jwt.secret,
        { expiresIn }
    );
    return token;
}
