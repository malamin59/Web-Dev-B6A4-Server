import { Request, Response } from "express";
import { loginUserInDB } from "./auth.service";


export const loginUser = async(req : Request , res: Response) =>{
try {

    const user = await  loginUserInDB(req.body)
    console.log("data come from auth controller page ",user)
    return res.status(200).json({
        success : true,
        data : {user}
    })
    
} catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message, 
    });
  }
}


import { authService } from "./auth.service";

const socialLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.socialLogin(req.body);
console.log("SOCIAL LOGIN USER DATA'S ------------>>>",result)
    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  socialLogin,
};