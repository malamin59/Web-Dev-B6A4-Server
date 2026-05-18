import { Router } from "express";
import { adminControllers } from "./admin.controller";

const adminRoute = Router()
adminRoute.get('/getAllUsers' , adminControllers.getAllUsers)

export default adminRoute