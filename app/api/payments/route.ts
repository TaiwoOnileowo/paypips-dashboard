import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatNumberWithCommas } from "@/lib/utils";

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

    // Fetch paginated user payments
    const userPayments = await prisma.payments.findMany({
      where: { owner_id: userId },
      skip,
      take: limit,
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

    // Fetch total count of payments for pagination info
    const totalPayments = await prisma.payments.count({
      where: { owner_id: userId },
    });

    const totalPages = Math.ceil(totalPayments / limit);

    return NextResponse.json({
      payments: formattedPayments,
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
