import { Request, Response } from "express";
import { tutorService } from "./tutor.service.js";

const createTutor = async (req: Request, res: Response) => {
  try {
    const result = await tutorService.createTutorProfileInDb(req.body);
    res.status(200).json({
      message: "Tutor profile created successfully",
      data: result,
    });
    return result;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const rate = req.query.rate
      ? Number(req.query.rate)
      : undefined;

    const result = await tutorService.getTutorInDb(search, rate);

    res.status(200).json({
      success: true,
      message: "Tutors retrieved successfully!",
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






const getSingleTutors = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await tutorService.getSingleTutorInDb(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
    return result;
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
const createAvailability = async (req: Request, res: Response) => {
  try {
    const result = await tutorService.createAvailabilityInDb(req.body);
    res.status(200).json({
      success: true,
      message: "Availability create Successfully!",
      data: result,
    });
    return result;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTutorByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await tutorService.getTutorByUserIdFromDb(userId as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTutorProfile = async (req: Request, res: Response) => {
  // console.log("Tutor Profile Update Function Called from controller ");
  try {
    const { id } = req.params;
    const result = await tutorService.updateTutorProfileInDb(
      id as string,
      req.body,
    );
    res.json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("Error Message From Update Profile Controller", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const tutorController = {
  createTutor,
  getAllTutors,
  getSingleTutors,
  createAvailability,
  getTutorByUserId,
  updateTutorProfile,
};
