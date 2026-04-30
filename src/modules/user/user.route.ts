import { Router } from "express";
import { userController } from "./user.controller";

const userRoute = Router()

userRoute.post('/' , userController.createUser )


export default userRoute
