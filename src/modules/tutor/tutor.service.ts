import { prisma } from "../../../lib/prisma";

const createTutorProfileInDb = async (data: any) => {
  const existingTutor = await prisma.tutorProfile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (existingTutor) {
    throw new Error("Tutor profile already exists");
  }
  const result = await prisma.tutorProfile.create({
    data,
  });

  return result;
};

export const tutorService = {
  createTutorProfileInDb,
};
