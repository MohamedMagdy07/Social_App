import {LoginDto, RegisterDto, ResetPasswordDto, SendOtpDto, VerifyAccountDto} from "../dto";
import userRepository from "../../user/repository/user.repository";
import bcrypt from "bcrypt";
import {userExists, userNotExists, userNotVerified, userVerified} from "../../user/error";
import {invalidOtp, noOtp, wrongPassword} from "../error";
import authRepository from "../repository/auth.repository";
import {comparePassword, hashPassword} from "../utils/password.hashing";
import {generateToken, verifyRefreshToken} from "../utils/token";
import {generateOTP} from "../../../common/pkg/utils/OtpGenerator";
import {IMailProvider} from "../../../common/pkg/email/interface";
import {mailjetProvider} from "../../../common/lib/email/init";
import crypto from "crypto";
import {IUserPayload} from "../../../common/lib/interfaces/userPayload.interface";
import {cacheProvider} from "../../../common/lib/cache/init";
import {AppError} from "../../../common/pkg/error/error";
import {convertToMs, Time} from "../../../common/pkg/utils/TimeConversion";


export class AuthService {

    private readonly mailProvider: IMailProvider = mailjetProvider;

    constructor() {
    }

    async login(loginDto: LoginDto) {
        let cachedTries = await cacheProvider.get(`login-tries:${loginDto.email}`);// "0"
        if (cachedTries === '0') throw new AppError('Too Many Requests To Login', 429);
        const user = await authRepository.findUserByEmail(loginDto.email);
        if (!user) throw userNotExists;
        if (!user.isVerified) throw userNotVerified;
        if (!user.password) throw wrongPassword;

        const isPasswordMatch = await comparePassword(loginDto.password, user.password);
        if (!isPasswordMatch) throw wrongPassword;
        const jti = crypto.randomUUID()

        await cacheProvider.set(`refreshToken:${jti}`, jti, convertToMs(7, Time.DAYS));

        let cachedTTL = await cacheProvider.getTtl(`login-tries:${loginDto.email}`);
        cachedTries = cachedTries ?? '5';
        const ttl = cachedTTL == -2 ? convertToMs(3, Time.MINUTES) : cachedTTL;
        await cacheProvider.set(`login-tries:${loginDto.email}`, String(+cachedTries - 1), ttl);


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
        const user = await userRepository.getOne({email: registerDto.email, isDeleted: false});
        if (user) throw userExists;
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        const createdUser = await userRepository.create(registerDto);
        createdUser.password = "";
        return createdUser;
    }

    async sendOtp(sendOtpDto: SendOtpDto) {
        const user = await userRepository.getOne({email:sendOtpDto.email,isDeleted:false});
        if (!user) throw userNotExists;
        const code = generateOTP();
        await cacheProvider.set(`otp:${user.email}`, code, convertToMs(5, Time.MINUTES));
        await this.mailProvider.send(user.email, 'new OTP', `<h1>Your new OTP is ${code}</h1>`);
    }

    async resetPassword(resetPasswordDto:ResetPasswordDto) {
        const user = await authRepository.findUserByEmail(resetPasswordDto.email);
        if (!user) throw userNotExists;
        const otp = await cacheProvider.get(`otp:${resetPasswordDto.email}`);
        if (!otp) throw noOtp;
        if (otp !== resetPasswordDto.code) throw invalidOtp;
        const hashedPassword = await hashPassword(resetPasswordDto.newPassword);
        await userRepository.updateUser({email:resetPasswordDto.email}, { password: hashedPassword });

        await cacheProvider.delete(`otp:${resetPasswordDto.email}`);
    }

    async verifyAccount(verifyAccountDto: VerifyAccountDto) {
        const userExist = await userRepository.getOne({email: verifyAccountDto.email, isDeleted: false});
        if (!userExist) throw userNotExists;
        if (userExist.isVerified) throw userVerified;

        const otp = await cacheProvider.get(`otp:${verifyAccountDto.email}`);
        if (!otp) throw noOtp;
        if (otp !== verifyAccountDto.code) throw invalidOtp;

        await cacheProvider.delete(`otp:${verifyAccountDto.email}`);
        const verifiedUser = await authRepository.verifyUser(verifyAccountDto.email);
        return verifiedUser;
    }


    async refreshToken(token:string) {
        const payload = verifyRefreshToken(token) as IUserPayload;
        const tokenId = await cacheProvider.get(`refreshToken:${payload.jti}`);
        if (!tokenId) throw new AppError('Used refresh token', 400);

        const jti = crypto.randomUUID();

        await cacheProvider.delete(`refreshToken:${tokenId}`);
        await cacheProvider.set(`refreshToken:${jti}`, jti, convertToMs(7, Time.DAYS));

        const accessToken = await generateToken(
            {
                sub: payload.sub,
                user:payload.userName,
                id: payload.id,
                email: payload.email,
            },
            "12h"
        );
        const refreshToken = await generateToken(
            {
                jti:jti,
                user:payload.userName,
                sub: payload.sub,
                id: payload.id,
                email: payload.email,
            },
            "7d"
        );


        return {accessToken,refreshToken};
    }

    async forgetPassword() {
    }

    async updateProfile() {

    }
}


export default new AuthService();
