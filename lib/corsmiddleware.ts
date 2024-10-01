import { NextRequest, NextResponse } from "next/server";

export default function corsMiddleware(
  handler: (req: NextRequest, res: NextResponse) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    // Handle OPTIONS request for CORS
    // if (req.method === "OPTIONS") {
    //   const allowedOrigins = [
    //     "https://paypips-dash.vercel.app",
    //     "https://www.paypipsbot.com",
    //     "http://localhost:3000/",
    //   ];

    //   const origin = req.headers.get("origin");

    //   const response = new NextResponse(null, { status: 204 });

    //   if (allowedOrigins.includes(origin || "")) {
    //     response.headers.set("Access-Control-Allow-Origin", origin!);
    //   } else {
    //     response.headers.set("Access-Control-Allow-Origin", "*"); // For testing
    //   }

    //   response.headers.set(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, PUT, DELETE, OPTIONS"
    //   );
    //   response.headers.set(
    //     "Access-Control-Allow-Headers",
    //     "Content-Type, Authorization,"
    //   );
    //   response.headers.set("Access-Control-Allow-Credentials", "true");
    //   console.log(response, origin);
    //   return response;
    // }

    // Continue with the request if not OPTIONS
    const response = await handler(req, NextResponse.next());

    const origin =req.headers.get("origin") || req.headers.get("referer") || "*"
    response.headers.set("Access-Control-Allow-Origin", origin!);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization,"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", "*");
    console.log(response, origin);
    return response;
  };
}
