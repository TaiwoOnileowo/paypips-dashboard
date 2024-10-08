import React from "react";
import forward from "@/assets/icons/forward.svg";
import Image from "next/image";
import priority from "@/assets/icons/priority.svg";
import backward from "@/assets/icons/backward.svg";

import { Payment, Payout } from "@/types";
const Transactions = ({
  name,

  transactions,
}: {
  name: string;

  transactions: Payment[] | Payout[];
}) => {
  return (
    <div className="w-full mt-4">
      <p className="font-medium text-gray-400 text-xs uppercase">{name}</p>
      {transactions.map((transaction, idx) => {
        const isPayout = transaction.isPayout;

        return (
          <div key={idx} className="flex justify-between mt-5 items-center">
            <div className="flex items-center  gap-2">
              <div
                className={`rounded-full w-8 h-8 border flex items-center justify-center ${
                  !isPayout ? " border-[#01B574]" : "border-[#E31A1A]"
                } `}
              >
                <Image
                  src={!isPayout ? forward : backward}
                  alt={!isPayout ? "up" : "down"}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium my-0.5 overflow-x-auto whitespace-nowrap scrollbar max-md:max-w-[150px] xl:max-w-[250px]">
                  {isPayout
                    ? `Payout to ${(transaction as Payout).beneficiary}`
                    : (transaction as Payment).plan}
                </h3>
                <p className="text-xs text-gray-400">
                  {transaction.date}, at {transaction.time}
                </p>
              </div>
            </div>
            <p
              className={`font-medium ${
                !isPayout ? " text-[#01B574]" : "text-[#E31A1A]"
              } `}
            >
              {isPayout ? "-" : "+$"}
              {transaction.amount}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
