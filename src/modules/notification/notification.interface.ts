import { NotificationType } from "@prisma/client";

export interface ICreateNotification {
  receiverId: string;
  senderId?: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}