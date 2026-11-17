import {LoginDto, RegisterDto, SendOtpDto, VerifyAccountDto} from "../dto";
import userRepository from "../../user/repository/user.repository";
import bcrypt from "bcrypt"

export class AuthService {
    constructor() {
    }

    async login(loginDto:LoginDto) {
    }

    async register(registerDto:RegisterDto) {
        const user = await userRepository.getOne({email: registerDto.email,isDeleted:false})
        if(user) throw new Error("User already exists")
        registerDto.password = await bcrypt.hash(registerDto.password,10);
        const createdUser = await userRepository.create(registerDto);
        createdUser.password=""
        return createdUser

    }

    async sendOtp(sendOtpDto:SendOtpDto) {
    }

    async verifyAccount(verifyAccountDto:VerifyAccountDto) {
    }

    async forgetPassword() {
    }

    async updateProfile() {

    }
}


export default new AuthService();