import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import {
  convertCurrencyToName,
  formatAmountWithSign,
  formatNumberWithCommas,
} from "@/lib/utils";

export const runtime = "nodejs";
const returnAddress = (address: string | null | undefined) => {
  if (!address) {
    return "";
  }
  if (address === "NOT YET SET") {
    return "";
  } else {
    return address;
  }
};
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "4";
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);
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

    // Calculate the number of items to skip
    const skip = page * limit;

    const userData = await prisma.user_details.findUnique({
      where: { owner_id: userId },
    });
    const userBalances = await prisma.available_balance.findMany({
      where: { owner_id: userId },
    });
    const userSubscriptionPlan = await prisma.sub_plan_owner.findFirst({
      where: { owner_id: userId },
    });
    const plan = {
      name: userSubscriptionPlan?.sub_plan_name,
      status: userSubscriptionPlan?.status,
    };

    const isPlanActive = plan.status?.toLowerCase() !== "pending";

    const userAddresses = [
      {
        account: returnAddress(userData?.trc_address),
        name: "TRC",
      },
      {
        account: returnAddress(userData?.btc_address),
        name: "BTC",
      },
      {
        account: returnAddress(userData?.ltct_address),
        name: "LTCT",
      },
      {
        account: returnAddress(userData?.sol_address),
        name: "SOL",
      },
      {
        account: returnAddress(userData?.erc_address),
        name: "ERC",
      },
    ];
    const accountBalances = userBalances.map((balance) => {
      return {
        name: convertCurrencyToName(balance.currency),
        amount:
          balance.currency === "BTC"
            ? balance.balance
            : formatNumberWithCommas(Number(balance.balance)),
      };
    });

    // const totalAccountBalances = await prisma.available_balance.count({
    //   where: { owner_id: userId },
    // });
    // const totalPages = Math.ceil(totalAccountBalances / limit);

    return NextResponse.json({
      addresses: userAddresses,
      balances: isPlanActive ? accountBalances : [],
      // pagination: {
      //   totalItems: totalAccountBalances,
      //   totalPages,
      //   currentPage: page,
      //   limit,
      // },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
