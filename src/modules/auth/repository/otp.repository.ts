import {IOtp, OTP} from "../model/otp.model";
import { invalidOtp, noOtp } from "../error";


class OtpRepository {
    constructor() {
    }

    async createOtp(otpData: Partial<IOtp>) {
        return await OTP.create(otpData);
    }

    async getOtpByEmail(email: string) {
        return await OTP.findOne({email});
    }

    async deleteOtp(email: string) {
        return await OTP.deleteMany({email});
    }

    async verifyOtp(code: string, email: string): Promise<void> {
        const otp = await this.getOtpByEmail(email);
        if (!otp) throw noOtp;
        if (code !== otp.code) throw invalidOtp;
    }

}

export default new OtpRepository();