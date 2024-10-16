import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";

export const runtime = "nodejs";

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

    const currentMonthClients = clients.filter((client) =>
      client.start_date ? client.start_date.getMonth() === currentMonth : false
    );

    return NextResponse.json({
      total: noOfClients.toString(),
      increase: `+${currentMonthClients.length}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
