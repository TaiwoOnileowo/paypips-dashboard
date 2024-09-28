"use server";
import prisma from "@/prisma/prisma";
import { signIn } from "@/auth";
import { SignJWT } from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

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

  const token = await new SignJWT({ id: user.owner_id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

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
