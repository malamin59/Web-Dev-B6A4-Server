import { prisma } from "../../../lib/prisma";

const createBookingIntoDb = async (data: any) => {
  const { studentId, tutorId, date } = data;

  // 1. check duplicate booking
  const existing = await prisma.booking.findFirst({
    where: {
      studentId,
      tutorId,
    },
  });

  if (existing) {
    throw new Error("You already booked this tutor");
  }

  // 2. check tutor exists
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  // 3. create booking
  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      date,
      amount: tutor.hourlyRate,
      status: "PENDING",
      paymentStatus: "PENDING",
    },
  });

  return booking;
};

const getAllBookingInDb = async () => {
  const result = await prisma.booking.findMany({
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
  return bookings;
};

export const bookingService = {
  createBookingIntoDb,
  getAllBookingInDb,
  getStudentBookingIntoDb,
  getTutorBookingsIntoDb,
};
