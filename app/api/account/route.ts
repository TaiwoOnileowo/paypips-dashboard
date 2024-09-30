import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";

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
    const userData = await prisma.user_details.findUnique({
      where: { owner_id: userId },
    });
    // const userAddresses = {
    //   trc: returnAddress(userData?.trc_address),
    //   btc: returnAddress(userData?.btc_address),
    //   ltct: returnAddress(userData?.ltct_address),
    //   sol: returnAddress(userData?.sol_address),
    //   erc: returnAddress(userData?.erc_address),
    //   localCurrency: userData?.local_currency || "",
    // };
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
    return NextResponse.json({
      addresses: userAddresses,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
};
