import React from "react";
import { Payment, Payout } from "@/types";
import { formatTimeAgo } from "@/lib/utils";
import domain from "@/assets/icons/domain.svg";
import { useGetTransactions } from "@/hooks/reactQueryHooks";
import { Skeleton } from "@/components/ui/skeleton";

import { Session } from "next-auth";

import Image from "next/image";
const LatestTransaction = ({ session }: { session: Session }) => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactions(session);
  if (isLoading) {
    return (
      <>
        <p className="text-xs mt-4 text-gray-400 font-medium ">NEWEST</p>
        <div className="flex items-center gap-5 mt-2">
          <Skeleton className="h-8 w-14" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      </>
    );
  }
  if (isError || !transactions) {
    return null;
  }
  const newestTransaction = transactions[0];
  const isPayout = newestTransaction?.isPayout;

  return (
    <>
      <p className="text-xs mt-4 text-gray-400 font-medium ">NEWEST</p>

      <div className="flex justify-between gap-2 mt-2 items-center w-full ">
        <div className="w-[15%]">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ico_bg">
            <Image src={domain} alt="domain" className="w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-between items-center w-[85%]">
          <div>
            <h3 className="text-sm font-medium  max-w-[200px] truncate" >
              {isPayout
                ? `Payout to ${(newestTransaction as Payout).beneficiary}`
                : (newestTransaction as Payment).plan}
            </h3>

            <p className="text-sm text-gray-400 mt-0.5">
              {formatTimeAgo(newestTransaction?.created_at || "")},{" "}
              {newestTransaction?.time}
            </p>
          </div>
          <p className=" font-bold">
            {isPayout ? "-" : "+"}${newestTransaction?.amount}
          </p>
        </div>
      </div>
    </>
  );
};

export default LatestTransaction;
