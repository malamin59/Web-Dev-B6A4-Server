import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

const createUserInDb = async (payload: any) => {
  const hasPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: hasPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
  return result;
};

export const UserService = {
  createUserInDb,
};
