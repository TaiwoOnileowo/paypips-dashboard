import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";

export const runtime = "nodejs";
const calculatePercentageIncrease = (
  currentValue: number,
  previousValue: number
) => {
  if (previousValue === 0) {
    console.log(currentValue, previousValue, "zero previuos");

    return currentValue > 0 ? "100" : "0";
  }
  console.log(currentValue, previousValue, "k");
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
    const clients = await prisma.sub_plan_owner.findMany();
    const noOfClients = await prisma.sub_plan_owner.count();
    const currentMonth = new Date().getMonth();
    const previousMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).getMonth();
    const currentMonthClients = clients.filter((client) =>
      client.start_date ? client.start_date.getMonth() === currentMonth : false
    );
    const previousMonthClients = clients.filter((client) =>
      client.start_date ? client.start_date.getMonth() === previousMonth : false
    );

    const percentageMonthlyIncrease = calculatePercentageIncrease(
      currentMonthClients.length,
      previousMonthClients.length
    );
    const clientChartData = {
      previous: noOfClients - currentMonthClients.length,
      new: currentMonthClients.length,
    };
    console.log(calculatePercentageIncrease(6, 3), "increment");
    return NextResponse.json({
      total: noOfClients.toString(),
      increase: `+${currentMonthClients.length}`,
      clientChartData,
      percentageMonthlyIncrease: !percentageMonthlyIncrease.includes("-")
        ? `+${percentageMonthlyIncrease}`
        : percentageMonthlyIncrease,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
