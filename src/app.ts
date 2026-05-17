import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoute from "./modules/user/user.route";
// import authRouter from "./modules/auth/auth.route";
// import tutorRoute from "./modules/tutor/tutor.route";
// import bookingRoute from "./modules/booking/booking.route";
// import reviewRoute from "./modules/review/review.route";

// // dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/tutor", tutorRoute);
// app.use("/api/v1/bookings", bookingRoute);
// app.use("/api/v1/reviews", reviewRoute);

// export default app;

const app = express();

app.get("/", (req, res) => {
  res.json({ ok: true });
});

export default app;