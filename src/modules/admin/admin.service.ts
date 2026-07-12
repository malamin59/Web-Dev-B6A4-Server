import { Role } from "@prisma/client";
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


const getAdminDashboardCharts = async () => {
  // Dashboard Counts
  const [
    totalUsers,
    totalTutors,
    totalStudents,
    totalBookings,
    totalReviews,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        role: Role.TUTOR,
      },
    }),
    prisma.user.count({
      where: {
        role: Role.STUDENT,
      },
    }),
    prisma.booking.count(),
    prisma.review.count(),
  ]);

  // ==========================
  // Bar Chart
  // ==========================
  const barChart = [
    {
      name: "Users",
      value: totalUsers,
    },
    {
      name: "Tutors",
      value: totalTutors,
    },
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Bookings",
      value: totalBookings,
    },
    {
      name: "Reviews",
      value: totalReviews,
    },
  ];

  // ==========================
  // Pie Chart
  // ==========================
  const pieChart = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Tutors",
      value: totalTutors,
    },
  ];

  // ==========================
  // Line Chart
  // ==========================
  const bookings = await prisma.booking.findMany({
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyBookings = Array.from({ length: 12 }, (_, index) => ({
    month: months[index],
    bookings: 0,
  }));

  bookings.forEach((booking) => {
    const monthIndex = booking.createdAt.getMonth();
    monthlyBookings[monthIndex].bookings += 1;
  });

  return {
    barChart,
    pieChart,
    lineChart: monthlyBookings,
  };
};

export const AdminService = {
  getAdminDashboardCharts,
};





export const adminService = {
  getAllUserInDb,
  getAdminDashboardCounts,
  getAdminDashboardCharts
};
