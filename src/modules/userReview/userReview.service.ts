import { prisma } from "../../../lib/prisma.js";

const createUserReviewInDb = async (data: any) => {
  const result = await prisma.userReview.create({
    data,
  });
  return result
};

export const userReviewService = {
  createUserReviewInDb,
};
