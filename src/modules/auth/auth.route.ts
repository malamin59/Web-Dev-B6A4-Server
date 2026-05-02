import { Router } from "express";
import { loginUser } from "./auth.controller";

const authRouter = Router()

authRouter.post('/login' , loginUser)

export default authRouter