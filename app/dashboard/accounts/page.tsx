import React from "react";
import PayMethods from "@/components/(dashboard)/Accounts/Paymethods/PayMethods";
import CreditBalance from "@/components/(dashboard)/Accounts/CreditBalance";
import AccountBalances from "@/components/(dashboard)/Accounts/AccountBalances/AccountBalances";
import RecentTransactions from "@/components/(dashboard)/Accounts/RecentTransactions/RecentTransactions";
import { auth } from "@/auth";
import SubscriptionAlert from "@/components/(dashboard)/SubscriptionAlert";
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
    <div className="p-6 text-white grid grid-cols-12 gap-6">
      <SubscriptionAlert session={session} />
      <div className="w-full max-lg:col-span-12  col-span-7 gap-6 flex flex-col ">
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-6 w-full col-span-12">
          <CreditBalance session={session} />
          <AccountBalances session={session} />
        </div>
        <PayMethods session={session} />
      </div>
      <RecentTransactions session={session} />
    </div>
  );
};

export default Page;
