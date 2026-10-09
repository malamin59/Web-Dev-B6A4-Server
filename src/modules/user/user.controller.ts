import { Request, Response } from "express";
import { UserService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUserInDb(req.body);
    // console.log("data from user controller Page", result);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message || "user Create Failed",
    });
  }
};



const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (
      typeof email !== "string" ||
      typeof otp !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await UserService.verifyEmail(email, otp);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Email verification failed",
    });
  }
};


export const userController = {
  createUser,
  verifyEmail,
};
