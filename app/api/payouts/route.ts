import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import {
  formatDate,
  formatTo12HourTime,
  formatAmountWithSign,
  formatNumberWithCommas,
} from "@/lib/utils";
import Fuse from "fuse.js";
export const runtime = "nodejs";
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "10";
  const searchQuery = searchParams.get("search") || "";

  // Filters
  const minAmount = parseFloat(searchParams.get("minAmount") || "0");
  // const minAmount = searchParams.get("minAmount");
  const maxAmount = parseFloat(searchParams.get("maxAmount") || "Infinity");

  // const maxAmount = searchParams.get("maxAmount");
  const currency = searchParams.get("currency");
  const status = searchParams.get("status");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

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

    // Construct date filter if startDate or endDate is provided
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter = {
        initiated_at: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
      };
    }

    // Calculate the number of items to skip
    const skip = page * limit;

    // Build the filter query
    const filters = {
      owner_id: userId,
      // ...(minAmount && { amount: { gte: minAmount } }),
      // ...(maxAmount && {
      //   amount: { ...(minAmount && { gte: minAmount }), lte: maxAmount },
      // }),
      ...(currency && { currency }),
      ...(status && { status }),
      ...dateFilter,
    };
    console.log(filters, maxAmount, minAmount);

    const userPayouts = await prisma.withdrawals.findMany({
      where: filters,
      orderBy: {
        initiated_at: "desc",
      },
    });
    const userSubscriptionPlan = await prisma.sub_plan_owner.findFirst({
      where: { owner_id: userId },
    });
    const plan = {
      name: userSubscriptionPlan?.sub_plan_name,
      status: userSubscriptionPlan?.status,
    };

    const isPlanActive = plan.status?.toLowerCase() !== "pending";
    // Format payouts for display
    const formattedPayouts = userPayouts.map((payout) => {
      return {
        id: payout.id,
        beneficiary: payout.address,
        amount:
          payout.currency === "BTC"
            ? payout.amount
            : formatNumberWithCommas(Number(payout.amount.toFixed(0))),
        currency: payout.currency,
        status: payout.status,
        date: formatDate(payout.initiated_at),
        time: formatTo12HourTime(payout.initiated_at),
      };
    });

    // Apply search if needed
    if (searchQuery) {
      const fuse = new Fuse(formattedPayouts, {
        keys: ["beneficiary", "currency"],
        threshold: 0.3,
      });

      const result = fuse.search(searchQuery).map((res) => res.item);
      const paginatedResult = result.slice(skip, skip + limit);
      const totalResults = result.length;
      const totalPages = Math.ceil(totalResults / limit);

      return NextResponse.json({
        payouts: isPlanActive ? paginatedResult : [],
        pagination: {
          totalItems: totalResults,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    }

    // Paginate results
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
