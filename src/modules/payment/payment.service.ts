import Stripe from "stripe";
import { prisma } from "../../../lib/prisma.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (data: {
  studentId: string;
  tutorId: string;
}) => {
  const { studentId, tutorId } = data;

  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const amount = tutor.hourlyRate;

  if (amount == null || amount <= 0) {
    throw new Error("Invalid tutor hourly rate");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert to cents
    currency: "usd",

    metadata: {
      studentId,
      tutorId,
    },

    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    amount,
  };
};

const confirmPayment = async (payload: any) => {
  const { studentId, tutorId, date, transactionId } = payload;

  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      date,
      amount: tutor.hourlyRate,
      paymentStatus: "PAID",
      status: "CONFIRMED",
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: tutor.hourlyRate,
      transactionId,
      status: "PAID",
      paymentMethod: "STRIPE",
    },
  });

  return booking;
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
};
