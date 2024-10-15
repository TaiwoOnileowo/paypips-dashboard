"use server";
import prisma from "@/prisma/prisma";
import { signIn, signOut } from "@/auth";
import { SignJWT } from "jose";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

export const getUserFromDb = async (email: string, password: string) => {
  const client = await prisma.user_details.findUnique({
    where: { email: email.toLowerCase() },
  });
  const employee = await prisma.employee_details.findUnique({
    where: { email: email.toLowerCase() },
  });
  const user = client || employee;
  if (!client && !employee) {
    console.log("nouser");
    return null;
  }

  if (user?.password !== password) {
    return null;
  }

  let token = "";
  if (client && "owner_id" in user) {
    token = await new SignJWT({ id: user.owner_id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);
    return {
      id: user.owner_id,
      email: user.email,
      token,
      fullname: user.full_name,
      role: "client",
    };
  }
  if (employee && "id" in user) {
    token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);
    return {
      id: user.id,
      email: user.email,
      token,
      role: user.role,
      fullname: user.full_name,
    };
  }
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
