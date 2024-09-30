import React from "react";

import PayMethods from "@/components/Accounts/PayMethods";
import CreditBalance from "@/components/Accounts/CreditBalance";
import AccountBalances from "@/components/Accounts/AccountBalances";
import RecentTransactions from "@/components/Accounts/RecentTransactions";
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
    <div className="p-6">
      <div className=" lg:grid text-white grid-cols-12 gap-4  flex flex-col ">
        <div className="col-span-8 lg:grid grid-cols-2 gap-4 flex flex-col ">
          <CreditBalance session={session} />
          <AccountBalances />
          <PayMethods session={session}/>
        </div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Page;
