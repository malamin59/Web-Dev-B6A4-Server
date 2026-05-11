import { prisma } from "../../../lib/prisma";

const createBookingIntoDb = async (data: any) => {
  const { studentId, tutorId } = data;
  const existing = await prisma.booking.findFirst({
    where: {
      studentId,
      tutorId,
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

const getTutorBookingsIntoDb = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const bookings = await prisma.booking.findMany({
    where: {
      tutorId: tutor.id,
    },
    include: {
      student: true,
    },
  });
  console.log("bookings data is here -->",bookings)
  return bookings;
};

export const bookingService = {
  createBookingIntoDb,
  getStudentBookingIntoDb,
  getTutorBookingsIntoDb,
};
