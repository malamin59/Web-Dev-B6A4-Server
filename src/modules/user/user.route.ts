import { Router } from "express";
import { userController } from "./user.controller.js";

const   userRoute = Router()

userRoute.post('/' , userController.createUser )


export default userRoute
