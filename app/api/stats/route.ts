import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { convertCurrency } from "@/lib/utils";
import jwt from "jsonwebtoken";

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
    const userTransactions = await prisma.transactions.findMany({
      where: { owner_id: userId },
    });

    const userSubscriptions = await prisma.subscriptions.findMany({
      where: { user_id: userId },
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

    // Filter today's and yesterday's subscriptions
    const todaySubscriptions = userSubscriptions.filter((subscription) =>
      subscription.start_date
        ? new Date(subscription.start_date).toDateString() === today
        : false
    );

    const yesterdaySubscriptions = userSubscriptions.filter((subscription) =>
      subscription.start_date
        ? new Date(subscription.start_date).toDateString() === yesterday
        : false
    );

    // Filter current and previous month's subscriptions
    const currentMonthSubscriptions = userSubscriptions.filter((subscription) =>
      subscription.start_date
        ? new Date(subscription.start_date).getMonth() === currentMonth
        : false
    );

    const previousMonthSubscriptions = userSubscriptions.filter(
      (subscription) =>
        subscription.start_date
          ? new Date(subscription.start_date).getMonth() === previousMonth
          : false
    );

    // Convert transactions
    const convertedTransactions = userTransactions.map((transaction) => {
      return {
        ...transaction,
        received_amount: convertCurrency(
          transaction.currency_type,
          transaction.received_amount
        ),
      };
    });

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
    const todayAmount = todayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const yesterdayAmount = yesterdayTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const totalAmount = convertedTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    // Monthly amounts
    const monthAmount = currentMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    const previousMonthAmount = previousMonthTransactions.reduce(
      (acc, transaction) => acc + transaction.received_amount,
      0
    );

    // Calculate percentage increases
    const todayAmountPercentageIncrease =
      yesterdayAmount > 0
        ? (((todayAmount - yesterdayAmount) / yesterdayAmount) * 100)
            .toFixed(2)
            .toString()
        : "100";
    console.log(yesterdayAmount, todayAmount, yesterdayTransactions);
    const totalAmountPercentageIncrease =
      totalAmount > 0
        ? ((todayAmount / (totalAmount - todayAmount)) * 100)
            .toFixed(2)
            .toString()
        : "0";

    const todaySubscriptionPercentageIncrease =
      yesterdaySubscriptions.length > 0
        ? (
            ((todaySubscriptions.length - yesterdaySubscriptions.length) /
              yesterdaySubscriptions.length) *
            100
          ).toFixed(2)
        : "100";

    const activeSubscriptionPercentageIncrease =
      userSubscriptions.length > 0
        ? (
            (todaySubscriptions.length /
              (userSubscriptions.length - todaySubscriptions.length)) *
            100
          )
            .toFixed(2)
            .toString()
        : "0";

    const monthAmountPercentageIncrease =
      previousMonthAmount > 0
        ? (((monthAmount - previousMonthAmount) / previousMonthAmount) * 100)
            .toFixed(2)
            .toString()
        : "100";

    const monthSubscriptionPercentageIncrease =
      previousMonthSubscriptions.length > 0
        ? (
            ((currentMonthSubscriptions.length -
              previousMonthSubscriptions.length) /
              previousMonthSubscriptions.length) *
            100
          )
            .toFixed(2)
            .toString()
        : "100";
    // console.log(yesterdayTransactions);
    // Return stats
    const stats = {
      amountstats: {
        totalAmount: totalAmount.toFixed(2).toString(),
        todayAmount: todayAmount.toFixed(2).toString(),
        monthAmount: monthAmount.toFixed(2).toString(),
        todayAmountPercentageIncrease,
        monthAmountPercentageIncrease,
        totalAmountPercentageIncrease,
      },
      subscriptionstats: {
        activeSubscriptions: userSubscriptions.length.toString(),
        todaySubscriptions: todaySubscriptions.length.toString(),
        todaySubscriptionPercentageIncrease,
        monthSubscriptionPercentageIncrease,
        activeSubscriptionPercentageIncrease,
      },
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
