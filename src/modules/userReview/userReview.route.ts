import express from "express";
import { UserReviewController } from "./userReview.controller.js";


const router = express.Router();

router.post("/", UserReviewController.createUserReview);
router.get("/", UserReviewController.getAllUserReviews);
// router.get("/", UserReviewController.getAllUserReviews);

export const UserReviewRoutes = router;