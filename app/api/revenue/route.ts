import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

import jwt from "jsonwebtoken";
import { formatNumberWithCommas } from "@/lib/utils";

// Utility function to calculate percentage increases
const calculatePercentageIncrease = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    return currentValue > 0 ? "100" : "0"; // If there's no previous data
  }
  return (((currentValue - previousValue) / previousValue) * 100)
    .toFixed(2)
    .toString();
};

export const GET = async (req: NextRequest, res: NextResponse) => {
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

    // Fetch user Payments and subscriptions
    const userPayments = await prisma.payments.findMany({
      where: { owner_id: userId },
    });

    // Calculate today, yesterday, current month, and previous month
    const today = new Date().toDateString();
    const yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toDateString();

    const currentMonth = new Date().getMonth();
    const previousMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).getMonth();

    // Filter today's and yesterday's Payments
    const todayPayments = userPayments.filter((payment) =>
      payment.created_at ? payment.created_at.toDateString() === today : false
    );

    const yesterdayPayments = userPayments.filter((payment) =>
      payment.created_at
        ? payment.created_at.toDateString() === yesterday
        : false
    );

    // Filter current and previous month's Payments
    const currentMonthPayments = userPayments.filter((payment) =>
      payment.created_at
        ? payment.created_at.getMonth() === currentMonth
        : false
    );

    const previousMonthPayments = userPayments.filter((payment) =>
      payment.created_at
        ? payment.created_at.getMonth() === previousMonth
        : false
    );

    // Calculate total and today's amounts
    const todayRevenue = todayPayments.reduce(
      (acc, payment) => acc + payment.amount_usd!,
      0
    );

    const yesterdayRevenue = yesterdayPayments.reduce(
      (acc, payment) => acc + payment.amount_usd!,
      0
    );

    const totalRevenue = userPayments.reduce(
      (acc, payment) => acc + payment.amount_usd!,
      0
    );
    // Monthly Revenues
    const monthRevenue = currentMonthPayments.reduce(
      (acc, payment) => acc + payment.amount_usd!,
      0
    );

    const previousMonthRevenue = previousMonthPayments.reduce(
      (acc, payment) => acc + payment.amount_usd!,
      0
    );

    const todayRevenuePercentageIncrease = calculatePercentageIncrease(
      todayRevenue,
      yesterdayRevenue
    );

    const totalRevenuePercentageIncrease =
      totalRevenue > 0
        ? ((todayRevenue / totalRevenue) * 100).toFixed(0).toString()
        : "0";

    const monthRevenuePercentageIncrease = calculatePercentageIncrease(
      monthRevenue,
      previousMonthRevenue
    );

    // const withdrawableRevenue
    const revenueStats = {
      totalRevenue: formatNumberWithCommas(
        Number(totalRevenue.toFixed(0).toString())
      ),
      todayRevenue: formatNumberWithCommas(
        Number(todayRevenue.toFixed(0).toString())
      ),
      monthRevenue: formatNumberWithCommas(
        Number(monthRevenue.toFixed(0).toString())
      ),
      todayRevenuePercentageIncrease,
      monthRevenuePercentageIncrease,
      totalRevenuePercentageIncrease,
    };

    return NextResponse.json(revenueStats);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
