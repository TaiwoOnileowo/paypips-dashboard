import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { convertCurrency } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { formatTo12HourTime, formatDate } from "@/lib/utils";
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

    const todayAmountPercentageIncrease = calculatePercentageIncrease(
      todayAmount,
      yesterdayAmount
    );

    const totalAmountPercentageIncrease =
      totalAmount > 0
        ? ((todayAmount / totalAmount) * 100).toFixed(2).toString()
        : "0";

    const todaySubscriptionPercentageIncrease = calculatePercentageIncrease(
      todaySubscriptions.length,
      yesterdaySubscriptions.length
    );

    const activeSubscriptionPercentageIncrease =
      userSubscriptions.length > 0
        ? ((todaySubscriptions.length / userSubscriptions.length) * 100)
            .toFixed(2)
            .toString()
        : "0";

    const monthAmountPercentageIncrease = calculatePercentageIncrease(
      monthAmount,
      previousMonthAmount
    );

    const monthSubscriptionPercentageIncrease = calculatePercentageIncrease(
      currentMonthSubscriptions.length,
      previousMonthSubscriptions.length
    );
    const userPayments = await prisma.payments.findMany({
      where: { userid: userId },
    });
    const userPayouts = await prisma.withdrawals.findMany({
      where: { owner_id: userId },
    });
    const convertedPayments = userPayments.map((payment) => ({
      ...payment,
      id: payment.id,
      amount: payment.amount.toFixed(2),
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
      amount: payout.amount.toFixed(2),
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
      transactionstats: {
        newest: sortedConcatenatedTransactions[0],
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
