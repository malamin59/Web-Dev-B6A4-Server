import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
export const loginUserInDB = async (payload: any) => {
  try {
    const { email, password } = payload;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // check user
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("email not fount");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
