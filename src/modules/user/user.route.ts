import { Router } from "express";
import { userController } from "./user.controller.js";

const   userRoute = Router()

userRoute.post('/' , userController.createUser);
userRoute.post("/verify-email", userController.verifyEmail);

export default userRoute
