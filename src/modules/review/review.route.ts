import { Router } from "express";
import { reviewController } from "./review.controller";

const reviewRoute = Router()

reviewRoute.post('/' , reviewController.createReview) 
reviewRoute.get('/my-reviews/:id', reviewController.getMyReviews) 
reviewRoute.get("/received/:id", reviewController.getTutorReviews);

export default reviewRoute

