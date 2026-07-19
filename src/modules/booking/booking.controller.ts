import { Request, Response } from "express";
import { bookingService } from "./booking.service.js";
/* CREATE BOOKING WITH PAYMENT */

const createBooking = async (req: Request, res: Response) => {
  
  try {
    if (!req.body.studentId || !req.body.tutorId || !req.body.date) {
      return res.status(400).json({
        success: false,
        message: "studentId, tutorId and date are required",
      });
    }
    const result = await bookingService.createBookingIntoDb(req.body);
    console.log("Booking result in here -->", result);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

const getAllBookingInDb = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookingInDb();
    res.status(200).json({
      success: true,
      message: "Booking get successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getStudentBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await bookingService.getStudentBookingIntoDb(id as string);
    res.status(200).json({
      success: true,
      message: "Student bookings retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTutorBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await bookingService.getTutorBookingsIntoDb(id as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const bookingController = {
  createBooking,
  getStudentBooking,
  getTutorBooking,
  getAllBookingInDb,
};
