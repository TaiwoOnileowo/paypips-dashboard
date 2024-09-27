"use server";
import prisma from "@/prisma/prisma";
import { signIn } from "@/auth";
export const getUserFromDb = async (email: string) => {
  // Find user by unique field (email)
  const user = await prisma.user_details.findUnique({
    where: { email },
  });

  // If user is not found, return null
  if (!user) {
    return null;
  }

  console.log(user, "user");

  return {
    id: user.owner_id,
    email: user.email,
    password: user.password,
  };
};

export const signInUser = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  const response: { ok: boolean; error?: string } = await signIn(
    "credentials",
    { email, password, }
  );
  return response;
};
