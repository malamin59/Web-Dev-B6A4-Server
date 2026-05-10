import { prisma } from "../../../lib/prisma";

const createBookingIntoDb = async (data: any) => {
  const { studentId, tutor } = data;
  const existing = await prisma.booking.findFirst({
    where: {
      studentId,
      tutor,
    },
  });
  if (existing) {
    throw new Error("you already booking the tutor");
  }

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

const getTutorBookingsIntoDb =
  async (tutorId: string) => {

    const result =
      await prisma.booking.findMany({

        where: {
          tutorId: tutorId,
        },

        include: {

          student: true,

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
  getTutorBookingsIntoDb
};
