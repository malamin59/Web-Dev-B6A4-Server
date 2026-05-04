import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
export const loginUserInDB = async (payload: any) => {
  try {
    const { email, password } = payload;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // check user
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      throw new Error("email not fount");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};




const socialLogin = async (payload: any) => {
  const { name, email,  provider } = payload;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  // create if not exists
  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        provider,
        role: "STUDENT",
      },
    });
  }

  // generate token
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    user,
    accessToken,
  };
};

export const authService = {
  socialLogin,
};
