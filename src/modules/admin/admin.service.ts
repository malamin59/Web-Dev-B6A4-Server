import { prisma } from "../../../lib/prisma.js";

const getAllUserInDb = async () => {
  const result = await prisma.user.findMany({
    include: {
      tutor: true,
    },
  });
  return result;
};

const getAdminDashboardCounts = async () => {
  const [totalUsers, totalTutors, totalStudents, totalBookings, totalReviews] =
    await Promise.all([
      prisma.user.count(),
      prisma.tutorProfile.count(),
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.booking.count(),
      prisma.review.count(),
    ]);
  return {
    totalUsers,
    totalTutors,
    totalStudents,
    totalBookings,
    totalReviews,
  };
};

export const adminService = {
  getAllUserInDb,
  getAdminDashboardCounts,
};
