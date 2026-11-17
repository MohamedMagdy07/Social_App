import {Request,Response,NextFunction} from "express";
import authService, {AuthService}  from "../service/auth.service";


class AuthController{
    private authService:AuthService= authService;
    constructor() {
    }
     register = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const user = await this.authService.register(req.body);
            res.status(200).json({message:"User Created successfully",success:true,data:user});

        }catch (err){
            next(err);
        }
    }

}


export default new AuthController();