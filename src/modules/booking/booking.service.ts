import { prisma } from "../../../lib/prisma";

const createBookingIntoDb = async (data: any) => {
  const result = await prisma.booking.create({
    data,
  });
  return result;
};

const getStudentBookingIntoDb = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      studentId: id,
    },

    include: {
      tutor: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};
export const bookingService = {
  createBookingIntoDb,
  getStudentBookingIntoDb,
};
