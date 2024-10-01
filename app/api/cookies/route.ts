import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { corsMiddleware } from "@/lib/corsmiddleware";

// POST Method (Set Cookie)
export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  const response = NextResponse.json({
    token,
  });

  const cookieStore = cookies();
  cookieStore.set("paypips_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    sameSite: "lax",
    path: "/",
  });

  return response;
};

// DELETE Method (Delete Cookie)
export const DELETE = async (req: NextRequest) => {
  const response = NextResponse.json({
    message: "Cookie deleted",
  });

  // Deleting cookie
  response.cookies.delete("paypips_token");
  return response;
};
