import IncomingPayments from "@/components/(dashboard)/Transactions/IncomingPayments/IncomingPayments";
import Withdrawals from "@/components/(dashboard)/Transactions/Withdrawals/Withdrawals";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/actions/user.actions";

const Page = async () => {
  const session = await auth();

  const token = session?.user.token;
  if (typeof token !== "string" || !session) {
    redirect("/sign-in");
  }

  const isTokenValid = await verifyToken(token);
  if (!isTokenValid) {
    redirect("/sign-in");
  }
  return (
    <div className="p-6   flex flex-col max-md:gap-6 md:gap-10 items-center">
      <IncomingPayments session={session} />
      <Withdrawals session={session} />
    </div>
  );
};

export default Page;
