import { Request, Response } from "express";

import { userReviewService } from "./userReview.service.js";
import catchAsync from "../../utils/catchAsync.js";

const createUserReview = catchAsync(async (req: Request, res: Response) => {
  const result = await userReviewService.createUserReviewInDb(req.body);
  console.log("data form user review page --->>", result);
  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

export const UserReviewController = {
  createUserReview,
};
