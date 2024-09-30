import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { convertCurrency } from "@/lib/utils";
import jwt from "jsonwebtoken";

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

    // Fetch user transactions and subscriptions
    const userTransactions = await prisma.transactions.findMany({
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

    // Convert transactions
    const convertedTransactions = userTransactions.map((transaction) => ({
      ...transaction,
      received_amount: convertCurrency(
        transaction.currency_type,
        transaction.received_amount
      ),
    }));

    // Filter today's and yesterday's transactions
    const todayTransactions = convertedTransactions.filter((transaction) =>
      transaction.created_at
        ? new Date(transaction.created_at).toDateString() === today
        : false
    );

    const yesterdayTransactions = convertedTransactions.filter((transaction) =>
      transaction.created_at
        ? new Date(transaction.created_at).toDateString() === yesterday
        : false
    );

    // Filter current and previous month's transactions
    const currentMonthTransactions = convertedTransactions.filter(
      (transaction) =>
        transaction.created_at
          ? new Date(transaction.created_at).getMonth() === currentMonth
          : false
    );

    const previousMonthTransactions = convertedTransactions.filter(
      (transaction) =>
        transaction.created_at
          ? new Date(transaction.created_at).getMonth() === previousMonth
          : false
    );

    // Calculate total and today's amounts
    const todayRevenue = todayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const yesterdayRevenue = yesterdayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const totalRevenue = convertedTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    // Monthly Revenues
    const monthRevenue = currentMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const previousMonthRevenue = previousMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const todayRevenuePercentageIncrease = calculatePercentageIncrease(
      todayRevenue,
      yesterdayRevenue
    );

    const totalRevenuePercentageIncrease =
      totalRevenue > 0
        ? ((todayRevenue / totalRevenue) * 100).toFixed(2).toString()
        : "0";

    const monthRevenuePercentageIncrease = calculatePercentageIncrease(
      monthRevenue,
      previousMonthRevenue
    );

    // const withdrawableRevenue
    const revenueStats = {
      totalRevenue: totalRevenue.toFixed(2).toString(),
      todayRevenue: todayRevenue.toFixed(2).toString(),
      monthRevenue: monthRevenue.toFixed(2).toString(),
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
