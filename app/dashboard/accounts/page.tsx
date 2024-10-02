import React from "react";

import PayMethods from "@/components/(dashboard)/Accounts/PayMethods";
import CreditBalance from "@/components/(dashboard)/Accounts/CreditBalance";
import AccountBalances from "@/components/(dashboard)/Accounts/AccountBalances";
import RecentTransactions from "@/components/(dashboard)/Accounts/RecentTransactions";
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
    <div className="p-6 text-white grid grid-cols-12">
      <div className="col-span-8 max-lg:col-span-12 flex flex-col gap-8">
        <div className="w-full lg:grid grid-cols-2 gap-4 flex flex-col ">
          <CreditBalance session={session} />
          <AccountBalances session={session} />
        </div>
        <PayMethods session={session} />
        <RecentTransactions session={session} />
      </div>
    </div>
  );
};

export default Page;
