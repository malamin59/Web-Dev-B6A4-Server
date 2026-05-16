import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
    console.log("controller hit");
  try {
    const result = await reviewService.createReviewIntoDb(req.body);
    console.log("review data here", result);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("FULL ERROR", error.message)
    res.status(409  ).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await reviewService.getMyReviewsInDb(id as string);
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
const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await reviewService.getTutorReviewsFromDb(id as string);

    res.json({
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



export const reviewController = {
  createReview,
  getMyReviews,
  getTutorReviews,
};
