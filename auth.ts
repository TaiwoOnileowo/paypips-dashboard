import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/validations/signin";
import { hashPassword } from "@/utils/password";
import { getUserFromDb } from "./lib/actions/user.actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Fetch user from DB by email
          const user = await getUserFromDb(email);

          // If no user found, throw error
          if (!user) {
            throw new Error("User not found.");
          }

          // Compare passwords
          const passwordMatch = password === user.password;
          // If passwords don't match, return null
          if (!passwordMatch) {
            throw new Error("Incorrect password.");
          }

          // Return user if everything is valid
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error: any) {
          // Handle Zod validation error (Invalid input)
          if (error instanceof ZodError) {
            throw new Error("Invalid input.");
          }

          // Handle any other custom errors (e.g., user not found, wrong password)
          throw new Error(error.message || "Something went wrong.");
        }
      },
    }),
  ],
  debug: true,
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
});
