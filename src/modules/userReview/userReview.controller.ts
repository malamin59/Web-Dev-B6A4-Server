import { Request, Response } from "express";

import { userReviewService } from "./userReview.service.js";
import catchAsync from "../../utils/catchAsync.js";

const createUserReview = catchAsync(async (req: Request, res: Response) => {
  const result = await userReviewService.createUserReviewInDb(req.body);
  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

const getAllUserReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await userReviewService.getAllUserReviews();

  res.status(200).json({
    success: true,
    message: "User Review retrieved Successfully!",
    data: result,
  });
});

export const UserReviewController = {
  createUserReview,
  getAllUserReviews,
};
