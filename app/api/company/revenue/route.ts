import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { formatDate, formatNumberWithK, groupDataByDate } from "@/lib/utils";
import axios from "axios";

export const runtime = "nodejs";

// Calculate percentage increase
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

// Supported currencies
const supportedCurrencies = ["BTC", "USDT", "NGN"];

// Fetch exchange rates for each currency in the array
const fetchExchangeRates = async () => {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  const exchangeRates: { [key: string]: number } = {};

  // Iterate over supported currencies, fetching exchange rates one by one
  await Promise.all(
    supportedCurrencies.map(async (currency) => {
      try {
        const response = await axios.get(
          `https://pro-api.coinmarketcap.com/v1/tools/price-conversion`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": apiKey,
            },
            params: {
              symbol: currency,
              convert: "USD",
              amount: 1,
            },
          }
        );

        // Store the exchange rate for the current currency
        const rate = response.data.data.quote.USD.price;
        exchangeRates[currency] = rate;
      } catch (error) {
        console.error(`Error fetching exchange rate for ${currency}: `, error);
      }
    })
  );

  return exchangeRates;
};
const convertToUSD = (amount: number, currency: string, exchangeRates: any) => {
  if (currency === "USD") {
    return amount; // Already in USD
  }
  if (currency === "LTCT") {
    return amount * 71.44;
  }

  if (exchangeRates[currency]) {
    return amount * exchangeRates[currency];
  }
  if (currency === "USDT.TRC20") {
    return amount * exchangeRates["USDT"];
  }

  throw new Error(`Unsupported currency: ${currency}`);
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

    // Fetch exchange rates for supported currencies
    const exchangeRates = await fetchExchangeRates();

    const transactions = await prisma.transactions.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const transactionsInUSD = transactions.map((transaction) => ({
      ...transaction,
      amount: convertToUSD(
        transaction.received_amount,
        transaction.currency_type,
        exchangeRates
      ),
    }));

    // Calculate revenue
    const totalAmountProcessed = transactionsInUSD.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    const today = new Date().toDateString();
    const yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toDateString();

    const currentMonth = new Date().getMonth();
    const previousMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).getMonth();

    const todayTransactions = transactionsInUSD.filter((transaction) =>
      transaction.created_at
        ? transaction.created_at.toDateString() === today
        : false
    );

    const yesterdayTransactions = transactionsInUSD.filter((transaction) =>
      transaction.created_at
        ? transaction.created_at.toDateString() === yesterday
        : false
    );
    const currentMonthTransactions = transactionsInUSD.filter((transaction) =>
      transaction.created_at
        ? transaction.created_at.getMonth() === currentMonth
        : false
    );
    const previousMonthTransactions = transactionsInUSD.filter(
      (transaction) => transaction.created_at?.getMonth() === previousMonth
    );

    const todayAmountProcessed = todayTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const yesterdayAmountProcessed = yesterdayTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const todayAmountProcessedPercentageIncrease = calculatePercentageIncrease(
      todayAmountProcessed,
      yesterdayAmountProcessed
    );

    const monthAmountProcessed = currentMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const previousMonthAmountProcessed = previousMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const monthAmountProcessedPercentageIncrease = calculatePercentageIncrease(
      monthAmountProcessed,
      previousMonthAmountProcessed
    );
    const amountProcessedChart = Object.values(
      groupDataByDate(transactionsInUSD)
    ).map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount.toFixed()),
    }));
// const monthlyAmountProcessedChart 
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
      amountProcessedChart,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
