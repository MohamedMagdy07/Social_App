import * as otpRepo from "../repository/otp.repository";
import { invalidOtp, noOtp } from "../error";

export async function verifyOtp(code: string, email: string): Promise<void> {
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw noOtp;
    if (code !== otp.code) throw invalidOtp;
}
