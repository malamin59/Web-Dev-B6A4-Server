import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js";
import tutorRoute from "./modules/tutor/tutor.route.js";
import bookingRoute from "./modules/booking/booking.route.js";
import reviewRoute from "./modules/review/review.route.js";
import adminRoute from "./modules/admin/admin.route.js";
import { PaymentRoutes } from "./modules/payment/payment.route.js";
import { UserReviewRoutes } from "./modules/userReview/userReview.route.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tutor", tutorRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/admin",     adminRoute);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/userReview", UserReviewRoutes);

export default app;
