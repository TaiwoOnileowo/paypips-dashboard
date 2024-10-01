import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { corsMiddleware } from "@/lib/corsmiddleware";
export const runtime = "nodejs";
export const GET = corsMiddleware(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const recent = searchParams.get("recent");
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  if (!token) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 400 });
  }
  if (!secret) {
    return NextResponse.json(
      { error: "Secret key is required" },
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userPayments = await prisma.payments.findMany({
      where: { owner_id: userId },
    });

    const sortedReturnPayments = userPayments
      .sort(
        (a, b) =>
          (b.created_at ? b.created_at.getTime() : 0) -
          (a.created_at ? a.created_at.getTime() : 0)
      )
      .map((payment) => {
        return {
          id: payment.id,
          amount: payment.amount_usd!.toFixed(0),
          plan: payment.groupname,
          method: payment.payment_method,
          date: formatDate(payment.created_at),
          email: payment.email,
        };
      });
    return NextResponse.json({
      payments: recent
        ? sortedReturnPayments.slice(0, 4)
        : sortedReturnPayments,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
});
