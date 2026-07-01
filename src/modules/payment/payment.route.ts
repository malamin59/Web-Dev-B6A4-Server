import express from "express";
import { PaymentController } from "./payment.controller.js";

const router = express.Router();

router.post("/create-payment-intent", PaymentController.createPaymentIntent);

router.post("/confirm", PaymentController.confirmPayment);

export const PaymentRoutes = router;
