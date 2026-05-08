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

const getTutorInDb = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      user: true,
    },
  });
  return result;
};
const getSingleTutorInDb = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      availability: true,
    },
  });
  return result;
};

const createAvailabilityInDb = async (data: any) => {
  const result = await prisma.availability.create({
    data,
  });
  return result;
};

const getTutorByUserIdFromDb  = async (userId: string) =>{
const result = await prisma.tutorProfile.findUnique({
  where :{
    userId
  }
})
return result
}

export const tutorService = {
  createTutorProfileInDb,
  getTutorInDb,
  getSingleTutorInDb,
  createAvailabilityInDb,
  getTutorByUserIdFromDb
};
