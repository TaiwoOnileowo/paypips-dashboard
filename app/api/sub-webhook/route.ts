// Webhook for Paystack events
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import crypto from "crypto";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function POST(request: Request) {
  const body = await request.json();
  const signature = request.headers.get("x-paystack-signature");

  // Verify Paystack signature
  const secret = process.env.PAYSTACK_SECRET_KEY as string;

  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (signature !== hash) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Event is verified, process the data
  const { event, data } = body;

  if (event === "charge.success") {
    const txnRef = data.reference; // Reference from Paystack event
    const userEmail = data.customer.email;
    const userDetails = await prisma.user_details.findFirst({
      where: { email: userEmail },
    });
    const userId = userDetails?.owner_id;
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check if the transaction has been processed already
    const existingTransaction = await prisma.processed_transactions.findFirst({
      where: { txn_id: txnRef },
    });

    if (existingTransaction) {
      return NextResponse.json(
        { message: "Transaction already processed" },
        { status: 400 }
      );
    }

    // Mark the transaction as processed
    await prisma.processed_transactions.create({
      data: { txn_id: txnRef },
    });

    // Activate subscription
    const userSubscription = await prisma.sub_plan_owner.findFirst({
      where: { owner_id: userId },
    });

    if (!userSubscription) {
      return NextResponse.json(
        { error: "No subscription plan found for this user" },
        { status: 404 }
      );
    }

    // Update subscription status
    await prisma.sub_plan_owner.update({
      where: { id: userSubscription.id },
      data: { status: "Active" },
    });

    return NextResponse.json(
      { message: "Subscription activated" },
      { status: 200 }
    );
  }

  // Handle other events like subscription.create, invoice.update, etc.
  return NextResponse.json({ message: "Event received" }, { status: 200 });
}
