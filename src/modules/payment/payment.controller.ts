import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    console.log("body data here ---->",req.body);
    const { studentId, tutorId } = req.body;
    // console.log("StudentId  ------>", studentId);
    // console.log("tutorId ------>", tutorId);
    if (!studentId || !tutorId) {
      return res.status(400).json({
        success: false,
        message: "studentId and tutorId are required",
      });
    }

    const result = await PaymentService.createPaymentIntent({
      studentId,
      tutorId,
    });

    console.log("Payment result ---->", result);

    return res.status(200).json({
      success: true,
      message: "Payment Intent Created Successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const confirmPayment = async (req: Request, res: Response) => {
  try {
    const result = await PaymentService.confirmPayment(req.body);

  res.status(200).json({
    success: true,
    message: "Payment Confirmed",
    data: result,
  });
  } catch (error: any) {
 return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const PaymentController = {
  createPaymentIntent,
  confirmPayment
};
