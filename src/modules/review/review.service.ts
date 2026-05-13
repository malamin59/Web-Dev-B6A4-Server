import { prisma } from "../../../lib/prisma";

const createReviewIntoDb = async (data: any) => {
  const { reviewerId, reviewedUserId } = data;

  const existingReview = await prisma.review.findFirst({
    where: {
      reviewerId,
      reviewedUserId,
    },
  });

  if (existingReview) {
    throw new Error("You already reviewed this user");
  }

  const result = await prisma.review.create({
    data,
  });

  return result;
};
/* GET MY REVIEWS */
const getMyReviewsInDb = async (userId: string) => {
  const result = await prisma.review.findMany({
    where: {
      reviewerId: userId,
    },
    include :{
      reviewedUser: true,
    }
  });
  return result
};

export const reviewService = {
  createReviewIntoDb,
  getMyReviewsInDb
};
