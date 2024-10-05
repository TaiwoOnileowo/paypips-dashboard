import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatTo12HourTime } from "@/lib/utils";
import Fuse from "fuse.js";

export const runtime = "nodejs";
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "10";
  const searchQuery = searchParams.get("search") || "";
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
          amount: payout.amount,
          currency: payout.currency,
          status: payout.status,
          date: formatDate(payout.initiated_at),
          time: formatTo12HourTime(payout.initiated_at),
        };
      });
    if (searchQuery) {
      const fuse = new Fuse(formattedPayouts, {
        keys: ["beneficiary", "currency"],
        threshold: 0.3,
      });

      const result = fuse.search(searchQuery).map((res) => res.item);
      const paginatedResult = result.slice(skip, skip + limit);
      console.log(paginatedResult)
      const totalResults = result.length;
      const totalPages = Math.ceil(totalResults / limit);
      return NextResponse.json({
        payouts: paginatedResult,
        pagination: {
          totalItems: totalResults,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    }

    const paginatedPayouts = formattedPayouts.slice(skip, skip + limit);
    const totalPayouts = userPayouts.length;
    const totalPages = Math.ceil(totalPayouts / limit);

    return NextResponse.json({
      payouts: paginatedPayouts,
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
