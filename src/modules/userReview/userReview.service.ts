import { prisma } from "../../../lib/prisma.js";

const createUserReviewInDb = async (data: any) => {
  const result = await prisma.userReview.create({
    data,
  });
  return result;
};

const getAllUserReviews = async () => {
  const [reviews, totalReviews] = await Promise.all([
    prisma.userReview.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.userReview.count(),
  ]);

  return {
    totalReviews,
    reviews,
  };
};

export const userReviewService = {
  createUserReviewInDb,
  getAllUserReviews
};
