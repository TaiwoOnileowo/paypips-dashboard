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

    const userSubscriptions = await prisma.subscriptions.findMany({
      where: { user_id: userId },
    });
    const userSubscriptionPlan = await prisma.sub_plan_owner.findFirst({
      where: { owner_id: userId },
    });
    const withdarawableBalance = userSubscriptionPlan?.available_balance;
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

    const monthSubscriptionPercentageIncrease = calculatePercentageIncrease(
      currentMonthSubscriptions.length,
      previousMonthSubscriptions.length
    );

    const subscriptionstats = {
      activeSubscriptions: userSubscriptions.length.toString(),
      todaySubscriptions: todaySubscriptions.length.toString(),
      todaySubscriptionPercentageIncrease,
      monthSubscriptionPercentageIncrease,
      activeSubscriptionPercentageIncrease,
      withdarawableBalance: withdarawableBalance || "0",
    };

    return NextResponse.json(subscriptionstats);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
