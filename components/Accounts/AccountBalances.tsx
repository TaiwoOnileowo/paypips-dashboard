import React from "react";
import { accountBalances } from "@/lib/data";
const AccountBalances = () => {
  return (
    <div
      className="col-span-1 text-white p-6 h-[240px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <h3 className="font-medium text-lg">Account Balances</h3>
      <div className="w-full flex flex-col items-center justify-center mt-3">
        {accountBalances.map((balance, index) => (
          <div
            key={index}
            className="flex w-full mt-3  gap-3 items-center justify-between "
          >
            <h3 className="">{balance.name}</h3>
            <p className="text-gray-400">{balance.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountBalances;
