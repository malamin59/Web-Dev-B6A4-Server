import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutor = async (req: Request, res: Response) => {
  try {
    const result = await tutorService.createTutorProfileInDb(req.body);
    console.log("Tutor Route Loaded");
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

export const tutorController = {
  createTutor,
};
