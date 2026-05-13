import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.createReviewIntoDb(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
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

export const reviewController = {
  createReview,
  getMyReviews,
};
