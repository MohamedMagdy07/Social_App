import crypto from "node:crypto";

export function generateOTP(length = 6): string {
    const max = 10 ** length;
    const otp = crypto.randomInt(0, max);

    return otp.toString().padStart(length, "0");
}
