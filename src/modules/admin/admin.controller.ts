import { Request, Response } from "express";
import { adminService } from "./admin.service.js";
import httpStatus from "http-status";

const getAdminDashboardCharts = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await adminService.getAdminDashboardCharts();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Dashboard chart data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve dashboard chart data",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUserInDb();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
const getAdminDashboardCounts = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAdminDashboardCounts();
    res.status(200).json({
      success: true,
      message: "all data Count retrieved Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


export const adminControllers = {
  getAllUsers,
  getAdminDashboardCounts,
  getAdminDashboardCharts
 };