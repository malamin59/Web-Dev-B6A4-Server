import Stripe from "stripe";
import { prisma } from "../../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booking.amount * 100),
    currency: "usd",
    metadata: {
      bookingId: booking.id,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};


export const PaymentService = {
  createPaymentIntent,
};