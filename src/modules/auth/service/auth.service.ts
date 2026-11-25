import {LoginDto, RegisterDto, SendOtpDto, VerifyAccountDto} from "../dto";
import userRepository from "../../user/repository/user.repository";
import bcrypt from "bcrypt";
import {userNotExists, userNotVerified} from "../../user/error";
import {wrongPassword} from "../error";
import otpRepository from "../repository/otp.repository";
import authRepository from "../repository/auth.repository";
import {comparePassword} from "../utils/password.hashing";
import {generateToken} from "../utils/token";
import {generateOTP} from "../../../common/pkg/utils/OtpGenerator";
import {IMailProvider} from "../../../common/pkg/email/interface";
import {mailjetProvider} from "../../../common/lib/email/init";
import crypto from "crypto";


export class AuthService {

    private readonly mailProvider: IMailProvider = mailjetProvider;

    constructor() {
    }

    async login(loginDto: LoginDto) {
        const user = await authRepository.findUserByEmail(loginDto.email);
        if (!user) throw userNotExists;
        if (!user.isVerified) throw userNotVerified;
        if (!user.password) throw wrongPassword;

        const isPasswordMatch = await comparePassword(loginDto.password, user.password);
        if (!isPasswordMatch) throw wrongPassword;
        const jti = crypto.randomUUID()
        const accessToken = await generateToken(
            {
                id: user._id,
                email: user.email,
            },
            "12h"
        );
        const refreshToken = await generateToken(
            {
                jti:jti,
                id: user._id,
                email: user.email,
            },
            "7d"
        );
        return {accessToken,refreshToken};
    }

    async register(registerDto: RegisterDto) {
        const user = await userRepository.getOne({email: registerDto.email, isDeleted: false})
        if (user) throw new Error("User already exists")
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        const createdUser = await userRepository.create(registerDto);
        createdUser.password = ""
        return createdUser
    }

    async sendOtp(sendOtpDto: SendOtpDto) {
        const user = await userRepository.getOne({email:sendOtpDto.email,isDeleted:false});// {} | null
        if (!user) throw userNotExists;
        const code = generateOTP();
        // 4. send otp into email
        await this.mailProvider.send(user.email, 'new OTP', `<h1>Your new OTP is ${code}</h1>`)
    }

    async verifyAccount(verifyAccountDto: VerifyAccountDto) {
        const userExist = await userRepository.getOne({email: verifyAccountDto.email, isDeleted: false})
        if (!userExist) throw userNotExists;
        if (userExist.isVerified) throw userNotVerified
        // const otp = await otpRepo.getOtpByEmail(email);
        // if (!otp) throw noOtp;
        // if (code !== otp.code) throw invalidOtp
        await otpRepository.verifyOtp(verifyAccountDto.code, verifyAccountDto.email);
        const verifiedUser = await authRepository.verifyUser(verifyAccountDto.email);
        await otpRepository.deleteOtp(verifyAccountDto.email)
        return verifiedUser;
    }

    async forgetPassword() {
    }

    async updateProfile() {

    }
}


export default new AuthService();
