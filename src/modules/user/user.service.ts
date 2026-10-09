import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../../utils/sendEmail.js";
// Temporary registration data
const pendingUsers = new Map<
  string,
  {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: string;
    otp: string;
    expires: Date;
  }
>();

const createUserInDb = async (payload: any) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Create verification token
  // const verifyToken = crypto.randomBytes(32).toString("hex");

  // // Token expires after 15 minutes
  const verifyExpires = new Date(Date.now() + 15 * 60 * 1000);
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 1000000).toString();

  // Store registration data temporarily
  pendingUsers.set(payload.email, {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    password: hashedPassword,
    otp,
    role: payload.role.toUpperCase(),
    expires: verifyExpires,
  });

  // Create verification link
  // const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

  // Email content
  const emailHtml = `
  <h2>Verify your SkillBridge account</h2>
  <p>Your verification code is:</p>
  <h1>${otp}</h1>
  <p>This code will expire in 15 minutes.</p>
`;

  // Send verification email
  await sendEmail(payload.email, "Verify your SkillBridge account", emailHtml);

  return {
    message: "Please check your email and verify your account.",
  };
};


const verifyEmail = async (email: string, otp: string) => {
  const pendingUser = pendingUsers.get(email);

  if (!pendingUser) {
    throw new Error("Registration data not found. Please register again.");
  }

  if (new Date() > pendingUser.expires) {
    pendingUsers.delete(email);
    throw new Error("OTP has expired. Please register again.");
  }

  if (pendingUser.otp !== otp) {
    throw new Error("Invalid OTP. Please try again.");
  }

  const user = await prisma.user.create({
    data: {
      name: pendingUser.name,
      email: pendingUser.email,
      phone: pendingUser.phone,
      password: pendingUser.password,
      role: pendingUser.role as any,
      emailVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
  });

  pendingUsers.delete(email);

  return {
    message: "Email verified successfully",
    user,
  };
};

export const UserService = {
  createUserInDb,
  verifyEmail,
};
