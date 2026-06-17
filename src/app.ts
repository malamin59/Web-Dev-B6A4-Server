import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./modules/user/user.route";
import authRouter from "./modules/auth/auth.route";
import tutorRoute from "./modules/tutor/tutor.route";
import bookingRoute from "./modules/booking/booking.route";
import reviewRoute from "./modules/review/review.route";
import adminRoute from "./modules/admin/admin.route";
import { PaymentRoutes } from "./modules/payment/payment.route";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tutor", tutorRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/payments", PaymentRoutes);

export default app;
