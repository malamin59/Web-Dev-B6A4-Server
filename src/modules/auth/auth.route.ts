import { Router } from "express";
import { authController, loginUser } from "./auth.controller";

const authRouter = Router()

authRouter.post('/login' , loginUser)
authRouter.post("/social-login", authController.socialLogin);


export default authRouter