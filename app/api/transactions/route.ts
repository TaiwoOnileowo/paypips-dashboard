import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatTo12HourTime, formatDate } from "@/lib/utils";
import corsMiddleware from "@/lib/corsmiddleware";

export const runtime = "nodejs";

export const GET = corsMiddleware(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  
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
    const userPayouts = await prisma.withdrawals.findMany({
      where: { owner_id: userId },
    });
    const convertedPayments = userPayments.map((payment) => ({
      ...payment,
      id: payment.id,
      amount: payment.amount.toFixed(0),
      plan: payment.groupname,
      method: payment.payment_method,
      date: formatDate(payment.created_at),
      time: formatTo12HourTime(payment.created_at),
      created_at: payment.created_at,
      email: payment.email,
      isPayout: false,
    }));

    const convertedPayouts = userPayouts.map((payout) => ({
      id: payout.id,
      beneficiary: payout.address,
      amount: payout.amount.toFixed(0),
      currency: payout.currency,
      status: payout.status,
      date: formatDate(payout.initiated_at),
      time: formatTo12HourTime(payout.initiated_at),
      created_at: payout.initiated_at,
      isPayout: true,
    }));
    const concatenatedTransactions = [
      ...convertedPayments,
      ...convertedPayouts,
    ];
    const sortedConcatenatedTransactions = concatenatedTransactions.sort(
      (a, b) =>
        (b.created_at ? b.created_at.getTime() : 0) -
        (a.created_at ? a.created_at.getTime() : 0)
    );
    // BOLU-TODO:Make created_at in transactions compulsory
    return NextResponse.json(sortedConcatenatedTransactions);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
});
