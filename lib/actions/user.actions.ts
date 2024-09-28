"use server";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { signIn } from "@/auth";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store this securely in env variables

export const getUserFromDb = async (email: string, password: string) => {
  // Find user by unique field (email)
  const user = await prisma.user_details.findUnique({
    where: { email },
  });

  // If user is not found, return null
  if (!user) {
    return null;
  }
  if (user.password !== password) {
    return null;
  }

  console.log(user, "user");

  const token = jwt.sign(
    {
      id: user.owner_id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    id: user.owner_id,
    email: user.email,
    token,
  };
};

export const signInUser = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  const response: { ok: boolean; error?: string } = await signIn(
    "credentials",
    { email, password }
  );
  return response;
};
