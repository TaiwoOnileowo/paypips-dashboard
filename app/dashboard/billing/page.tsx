import React from "react";

import PayMethods from "@/components/Billing/PayMethods";
import CreditBalance from "@/components/Billing/CreditBalance";
import AccountBalances from "@/components/Billing/AccountBalances";
import RecentTransactions from "@/components/Billing/RecentTransactions";

const Page = () => {
  return (
    <div className="p-6">
      <div className=" lg:grid text-white grid-cols-12 gap-4  flex flex-col ">
        <div className="col-span-8 lg:grid grid-cols-2 gap-4 flex flex-col ">
          <CreditBalance />
          <AccountBalances />
          <PayMethods />
        </div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Page;
