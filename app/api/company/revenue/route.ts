import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatNumberWithK } from "@/lib/utils";

export const runtime = "nodejs";
const appId = process.env.OPEN_EXCHANGE_RATES_ID;

async function convertAmount({
  amount,
  currency,
  toUSD = false,
}: {
  amount: number;
  currency: string;
  toUSD?: boolean;
}): Promise<number> {
  try {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD`
    );
    const data = await response.json();

    const exchangeRate = data.rates[currency];
    console.log(data.rates, exchangeRate);
    return toUSD ? amount * exchangeRate : amount / exchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw new Error("Failed to fetch exchange rate");
  }
}
const calculatePercentageIncrease = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    return currentValue > 0 ? "100" : "0"; // If there's no previous data
  }
  return (((currentValue - previousValue) / previousValue) * 100)
    .toFixed(0)
    .toString();
};
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

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

    if (!id) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }
    const employee = await prisma.employee_details.findFirst({
      where: { id: id },
    });
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 400 }
      );
    }
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const currentMonth = new Date(new Date().getMonth());
    const previousMonth = new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).getMonth()
    );

    const transactions = await prisma.transactions.findMany();
    const todayTransactions = transactions.filter(
      (transaction) => transaction.created_at === today
    );
    const yesterdayTransactions = transactions.filter(
      (transaction) => transaction.created_at === yesterday
    );
    const currentMonthTransactions = transactions.filter(
      (transaction) => transaction.created_at === currentMonth
    );
    const previousMonthTransactions = transactions.filter(
      (transaction) => transaction.created_at === previousMonth
    );

    // const transactionsInUSD = await Promise.all(
    //   transactions.map(async (transaction) => {
    //     const amountInUSD = await convertAmount({
    //       amount: transaction.received_amount,
    //       currency: transaction.currency_type,
    //       toUSD: true,
    //     });
    //     return {
    //       ...transaction,
    //       amountInUSD,
    //     };
    //   })
    // );
    const totalAmountProcessed = transactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const todayAmountProcessed = todayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );
    const yesterdayAmountProcessed = yesterdayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );
    const todayAmountProcessedPercentageIncrease = calculatePercentageIncrease(
      todayAmountProcessed,
      yesterdayAmountProcessed
    );
    const monthAmountProcessed = currentMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );
    const previousMonthAmountProcessed = previousMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );
    const monthAmountProcessedPercentageIncrease = calculatePercentageIncrease(
      monthAmountProcessed,
      previousMonthAmountProcessed
    );
    return NextResponse.json({
      totalAmountProcessed: `$${formatNumberWithK(totalAmountProcessed)}`,
      todayAmountProcessedIncrease:
        !todayAmountProcessedPercentageIncrease.includes("-")
          ? `+${todayAmountProcessedPercentageIncrease}`
          : todayAmountProcessedPercentageIncrease,
      monthAmountProcessedIncrease:
        !monthAmountProcessedPercentageIncrease.includes("-")
          ? `+${monthAmountProcessedPercentageIncrease}`
          : monthAmountProcessedPercentageIncrease,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
