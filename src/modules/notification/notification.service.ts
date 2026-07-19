import { prisma } from "../../../lib/prisma.js";
import { ICreateNotification } from "./notification.interface.js";

const createNotification = async (payload: ICreateNotification) => {
  try {
    console.log("Notification Service Called");
    console.log(payload);

    const notification = await prisma.notification.create({
      data: payload,
    });

    console.log("Notification Created:", notification);

    return notification;
  } catch (error) {
    console.error("Notification Error:", error);
    throw error;
  }
};

export const NotificationService = {
  createNotification,
};
