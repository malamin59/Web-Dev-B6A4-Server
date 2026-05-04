import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUserInDb(req.body);
    console.log("data from user controller Page", result);
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


export const userController = {
  createUser,
};
