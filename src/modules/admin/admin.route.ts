import { Router } from "express";
import { adminControllers } from "./admin.controller";

const adminRoute = Router();
adminRoute.get("/getAllUsers", adminControllers.getAllUsers);
adminRoute.get("/getAdminDashboardCounts", adminControllers.getAdminDashboardCounts);
;

export default adminRoute;
