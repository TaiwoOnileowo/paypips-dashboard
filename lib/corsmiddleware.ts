// @ts-nocheck
import { NextResponse } from "next/server";
export function corsMiddleware(handler) {
  return async (req) => {
    if (req.method === "OPTIONS") {
      const allowedOrigins = [
        "https://www.paypipsbot.com",
        "https://paypips-dashboard.vercel.app/",
      ];

      const origin = req.headers.get("origin");

      if (allowedOrigins.includes(origin)) {
        return NextResponse.next({
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Extension-ID",
            "Access-Control-Allow-Credentials": "true",
          },
        });
      }

      return NextResponse.json(
        { message: "CORS blocked the request." },
        { status: 403 }
      );
    }

    return handler(req);
  };
}
