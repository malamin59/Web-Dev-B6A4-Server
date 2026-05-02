import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

const createUserInDb = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  // check user already existed in db 
 const existUser = await prisma.user.findUnique({
  where : {email : payload.email}
 })
 if(existUser) {
  throw new Error ("user already existed")
 }
  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: hashedPassword,
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
