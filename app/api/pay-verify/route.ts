import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  const userId = searchParams.get("userId");
  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const user = await prisma.user_details.findFirst({
    where: { owner_id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const processedTransactions = await prisma.processed_transactions.findFirst(
      {
        where: { txn_id: ref },
      }
    );
    if (processedTransactions) {
      return NextResponse.json(
        { message: "Transaction already processed" },
        { status: 400 }
      );
    } else {
      await prisma.processed_transactions.create({
        data: {
          txn_id: ref,
        },
      });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === true) {
      const userSubscriptionPlan = await prisma.sub_plan_owner.findFirst({
        where: { owner_id: userId },
      });
      if (!userSubscriptionPlan) {
        return NextResponse.json(
          { error: "No subscription plan found for this user" },
          { status: 404 }
        );
      }
      const updatedSubscriptionPlan = await prisma.sub_plan_owner.update({
        where: {
          id: userSubscriptionPlan.id,
        },
        data: {
          status: "Active",
        },
      });
      return NextResponse.json(
        { message: "Subscription activated", updatedSubscriptionPlan },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ status: 400, data }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
