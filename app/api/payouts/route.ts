import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatNumberWithCommas, formatTo12HourTime } from "@/lib/utils";

export const runtime = "nodejs";
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "10";
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);

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
    // Calculate the number of items to skip
    const skip = page * limit;

    const userPayouts = await prisma.withdrawals.findMany({
      where: { owner_id: userId },
      skip,
      take: limit,
      orderBy: {
        initiated_at: "desc",
      },
    });
    const formattedPayouts = userPayouts
      .sort(
        (a, b) =>
          (b.initiated_at ? b.initiated_at.getTime() : 0) -
          (a.initiated_at ? a.initiated_at.getTime() : 0)
      )
      .map((payout) => {
        return {
          id: payout.id,
          beneficiary: payout.address,
          amount: formatNumberWithCommas(Number(payout.amount)),
          currency: payout.currency,
          status: payout.status,
          date: formatDate(payout.initiated_at),
          time: formatTo12HourTime(payout.initiated_at),
        };
      });
    // Fetch total count of payments for pagination info
    const totalPayouts = await prisma.withdrawals.count({
      where: { owner_id: userId },
    });

    const totalPages = Math.ceil(totalPayouts / limit);

    return NextResponse.json({
      payouts: formattedPayouts,
      pagination: {
        totalItems: totalPayouts,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
