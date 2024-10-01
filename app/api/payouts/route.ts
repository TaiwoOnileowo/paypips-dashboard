import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatTo12HourTime } from "@/lib/utils";
export const runtime = "nodejs";
export const GET = async (req: NextRequest) => {
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
    const userPayouts = await prisma.withdrawals.findMany({
      where: { owner_id: userId },
    });
    const sortedReturnPayouts = userPayouts
      .sort(
        (a, b) =>
          (b.initiated_at ? b.initiated_at.getTime() : 0) -
          (a.initiated_at ? a.initiated_at.getTime() : 0)
      )
      .map((payout) => {
        return {
          id: payout.id,
          beneficiary: payout.address,
          amount: payout.amount.toFixed(0),
          currency: payout.currency,
          status: payout.status,
          date: formatDate(payout.initiated_at),
          time: formatTo12HourTime(payout.initiated_at),
        };
      });
    return NextResponse.json({
      payouts: recent ? sortedReturnPayouts.slice(0, 4) : sortedReturnPayouts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
