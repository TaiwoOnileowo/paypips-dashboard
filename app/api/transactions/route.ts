import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import {
  formatTo12HourTime,
  formatDate,
  formatNumberWithCommas,
  formatAmountWithSign,
} from "@/lib/utils";

export const runtime = "nodejs";
const returnAddress = (address: string | null | undefined) => {
  if (!address) {
    return "";
  }
  if (address === "NOT YET SET") {
    return "";
  } else {
    return address;
  }
};
export const GET = async (req: NextRequest) => {
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
    const user = await prisma.user_details.findFirst({
      where: { owner_id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
      amount: formatNumberWithCommas(Number(payment.amount_usd!.toFixed(0))),
      plan: payment.groupname,
      method: payment.payment_method,
      date: formatDate(payment.created_at, "DD-MM-YYYY"),
      time: formatTo12HourTime(payment.created_at),
      created_at: payment.created_at,
      email: payment.email,
      isPayout: false,
    }));

    const convertedPayouts = userPayouts.map((payout) => ({
      id: payout.id,
      beneficiary: payout.address,
      amount:
        payout.currency === "BTC"
          ? formatAmountWithSign(payout.currency, payout.amount.toString())
          : formatAmountWithSign(
              payout.currency,
              formatNumberWithCommas(Number(payout.amount.toFixed(0)))
            ),
      currency: payout.currency,
      status: payout.status,
      date: formatDate(payout.initiated_at, "DD-MM-YYYY"),
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
};
