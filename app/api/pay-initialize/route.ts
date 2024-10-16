import https from "https";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { email, name } = body;
    const baseURL = process.env.BASE_URL;

    const params = JSON.stringify({
      name,
      email,
      // amount: Math.ceil(amountInNairaWithCharges).toString(),
      amount: "255000",
      plan: "PLN_gkdo563x07xn53m",
      // plan: "PLN_upkkg4cy0u3zbiz",
      callback_url: `${baseURL}/dashboard/profile`,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    return new Promise<Response>((resolve, reject) => {
      const paystackReq = https.request(options, (paystackRes) => {
        let data = "";

        paystackRes.on("data", (chunk) => {
          data += chunk;
        });

        paystackRes.on("end", () => {
          const response = JSON.parse(data);
          if (response.status) {
            resolve(NextResponse.json(response.data, { status: 200 }));
          } else {
            resolve(NextResponse.json(response, { status: 400 }));
          }
        });
      });

      paystackReq.on("error", (error) => {
        console.error(error);
        reject(
          NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
        );
      });

      paystackReq.write(params);
      paystackReq.end();
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
