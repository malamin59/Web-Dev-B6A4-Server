import { prisma } from "../../../lib/prisma";

const createBookingIntoDb = async (data: any) => {
  const result = await prisma.booking.create({
    data,
  });
  return result;
};

export const bookingService = {
  createBookingIntoDb,
};
