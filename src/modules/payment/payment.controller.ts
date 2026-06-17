import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

const createPaymentIntent = async (
  req: Request,
  res: Response
) => {
  const { bookingId } = req.body;

  const result = await PaymentService.createPaymentIntent(
    bookingId
  );

  res.status(200).json({
    success: true,
    message: "Payment Intent Created Successfully",
    data: result,
  });
};

export const PaymentController = {
  createPaymentIntent,
};