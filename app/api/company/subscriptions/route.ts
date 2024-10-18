import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import { groupDataByMonth } from "@/lib/utils";

export const runtime = "nodejs";

// Helper function to calculate percentage increase
const calculatePercentageIncrease = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    return currentValue > 0 ? "100" : "0";
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

    // Fetch all subscription plans and their statuses
    const subscriptions = await prisma.sub_plan_owner.findMany({
      select: {
        sub_plan_name: true,
        status: true,
        start_date: true,
      },
    });

    // Group data by month and plan name
    const groupedSubscriptions = groupDataByMonth(subscriptions);

    // Calculate percentage increase for each plan
    const subscriptionsChartData = groupedSubscriptions.map(
      ({ plan, currentMonthValue, previousMonthValue }) => ({
        plan: plan.split(" ")[0],
        value: currentMonthValue,
        increase: calculatePercentageIncrease(
          currentMonthValue,
          previousMonthValue
        ),
      })
    );
    const mostIncreasedPlan = subscriptionsChartData.reduce(
      (max, plan) =>
        parseFloat(plan.increase) > parseFloat(max.increase) ? plan : max,
      { plan: "", increase: "0" }
    );
    return NextResponse.json({ subscriptionsChartData, mostIncreasedPlan });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
