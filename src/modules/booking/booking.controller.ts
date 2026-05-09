import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingIntoDb(req.body);
    res.status(200).json({
      success: true,
      message: "Booking created successfully",
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

export const bookingController = {
  createBooking,
  getStudentBooking,
};
