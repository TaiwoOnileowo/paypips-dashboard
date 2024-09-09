import React from "react";
import { recentTransactions } from "@/lib/data";
import forward from "@/assets/icons/forward.svg";
import Image from "next/image";
import priority from "@/assets/icons/priority.svg";
import backward from "@/assets/icons/backward.svg";

const Transactions = ({
  name,
  showRecent, // Prop to toggle between recent and non-recent transactions
}: {
  name: string;
  showRecent: boolean; // New prop
}) => {
  // Filter recent or non-recent transactions based on the prop
  const filteredTransactions = showRecent
    ? recentTransactions.slice(0, 2) // Recent transactions (index 0 and 1)
    : recentTransactions.slice(2); // Non-recent transactions (index 2 and above)

  return (
    <div className="w-full mt-4">
      <p className="font-medium text-gray-400 text-xs uppercase">{name}</p>
      {filteredTransactions.map((transaction, idx) => {
        const payin = transaction.amount.includes("+");
        const pending = transaction.amount.includes("Pending");
        return (
          <div key={idx} className="flex justify-between mt-5 items-center">
            <div className="flex items-center justify-center gap-4">
              <div
                className={`rounded-full w-10 h-10 border flex items-center justify-center ${
                  pending
                    ? "border-gray-400"
                    : payin
                    ? " border-[#01B574]"
                    : "border-[#E31A1A]"
                } `}
              >
                <Image
                  src={pending ? priority : payin ? forward : backward}
                  alt={pending ? "pending" : payin ? "up" : "down"}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium my-0.5">
                  {transaction.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {transaction.date}, at {transaction.time}
                </p>
              </div>
            </div>
            <p
              className={`font-medium ${
                pending
                  ? "text-gray-400"
                  : payin
                  ? " text-[#01B574]"
                  : "text-[#E31A1A]"
              } `}
            >
              {transaction.amount}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
