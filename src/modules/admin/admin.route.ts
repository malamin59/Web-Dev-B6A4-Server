import { Router } from "express";
import { adminControllers } from "./admin.controller.js";

const adminRoute = Router();
adminRoute.get("/getAllUsers", adminControllers.getAllUsers);
adminRoute.get(
  "/getAdminDashboardCounts",
  adminControllers.getAdminDashboardCounts,
);

adminRoute.get(
  "/getAdminDashboardCharts",
  adminControllers.getAdminDashboardCharts,
);

export default adminRoute;
