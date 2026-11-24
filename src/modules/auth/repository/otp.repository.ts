import { OTP, IOtp } from "../model/otp.model";

export async function createOtp(otpData: Partial<IOtp>) {
    return await OTP.create(otpData);
}

export async function getOtpByEmail(email: string) {
    return await OTP.findOne({ email });
}

export async function deleteOtp(email: string) {
    return await OTP.deleteMany({ email });
}
