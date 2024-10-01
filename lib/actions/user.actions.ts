"use server";
import prisma from "@/prisma/prisma";
import { signIn, signOut } from "@/auth";
import { SignJWT } from "jose";
import { jwtVerify } from "jose";
import { baseURL } from "../http";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

export const getUserFromDb = async (email: string, password: string) => {
  // Find user by unique field (email)

  const user = await prisma.user_details.findUnique({
    where: { email: email.toLowerCase() },
  });

  console.log(user, "useraction", email);

  // If user is not found, return null
  if (!user) {
    console.log("nouser");
    return null;
  }

  if (user.password !== password) {
    console.log()
    return null;
  }

  const token = await new SignJWT({ id: user.owner_id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
  console.log(token, "token user");
  return {
    id: user.owner_id,
    email: user.email,
    token,
    fullname: user.full_name,
  };
};

export const signInUser = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  const response = await signIn("credentials", { email, password });
  return response;
};
export const signOutUser = async () => {
  await signOut();
};

export const verifyToken = async (token: string) => {
  try {
    // Verify the token with jose
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Return the decoded payload (which contains the claims)
    return payload;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
};
