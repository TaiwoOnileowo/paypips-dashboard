import NextAuth, { Session } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/validations/signin";
import { hashPassword } from "@/utils/password";
import { getUserFromDb } from "./lib/actions/user.actions";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: JWT;
    };
  }
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: JWT;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        try {
          // const { email, password } = await signInSchema.parseAsync(
          //   credentials
          // );
          const { email, password } = credentials;
          // Fetch user from DB by email
          const user = await getUserFromDb(email, password);

          // If no user found, throw error
          if (!user) {
            throw new Error("User not found.");
          }

          // Return user if everything is valid
          return {
            id: user.id,
            email: user.email,
            token: user.token as unknown as JWT,
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id as string;

      session.user.token = token.token as JWT;
      return session;
    },
  },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
});
