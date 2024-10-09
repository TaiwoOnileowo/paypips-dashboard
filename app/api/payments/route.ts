import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatNumberWithCommas } from "@/lib/utils";
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
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
    const userSubscriptionPlan = await prisma.sub_plan_owner.findFirst({
      where: { owner_id: userId },
    });
    const plan = {
      name: userSubscriptionPlan?.sub_plan_name,
      status: userSubscriptionPlan?.status,
    };

    const isPlanActive = plan.status?.toLowerCase() === "active";
    // Fetch user payments without pagination to apply search
    const userPayments = await prisma.payments.findMany({
      where: { owner_id: userId },
      orderBy: {
        created_at: "desc", // Order by created_at in descending order
      },
    });

    // Format the payments
    const formattedPayments = userPayments.map((payment) => ({
      id: payment.id,
      amount: formatNumberWithCommas(Number(payment.amount_usd!.toFixed(0))),
      plan: payment.groupname,
      method: payment.payment_method,
      date: formatDate(payment.created_at),
      email: payment.email,
    }));

    // Search functionality using Fuse.js
    if (searchQuery) {
      const fuse = new Fuse(formattedPayments, {
        keys: ["plan", "method", "email"],
        threshold: 0.3,
      });

      const result = fuse.search(searchQuery).map((res) => res.item);
      const paginatedResult = result.slice(skip, skip + limit);
      const totalResults = result.length;
      const totalPages = Math.ceil(totalResults / limit);
      return NextResponse.json({
        payments: paginatedResult,
        pagination: {
          totalItems: totalResults,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    }

    const paginatedPayments = formattedPayments.slice(skip, skip + limit);

    // Fetch total count of payments for pagination info
    const totalPayments = userPayments.length;
    const totalPages = Math.ceil(totalPayments / limit);

    return NextResponse.json({
      payments: isPlanActive ? paginatedPayments : [],
      pagination: {
        totalItems: totalPayments,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
};
