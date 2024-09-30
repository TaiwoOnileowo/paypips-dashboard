"use client";
import React, { useState } from "react";
import Image from "next/image";
import graph from "@/assets/icons/graph.svg";
import more from "@/assets/icons/more.svg";
import domain from "@/assets/icons/domain.svg";
import { useGetStats } from "@/hooks/reactQueryHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Session } from "next-auth";

import { IoEyeOffOutline } from "react-icons/io5";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Payment, Payout } from "@/types";
import { formatTimeAgo } from "@/lib/utils";
const CreditBalance = ({ session }: { session: Session }) => {
  if (typeof window === "undefined") return null;
  const { data: stats, isLoading } = useGetStats(session);
  const [hideAmount, setHideAmount] = useState(
    localStorage.getItem("hide-amount") === "true" || false
  );
  const [hideAmountByDefault, setHideAmountByDefault] = useState(
    localStorage.getItem("hide-amount") === "true" || false
  );

  const handleHideAmountByDefault = () => {
    setHideAmountByDefault(!hideAmountByDefault);
    localStorage.setItem("hide-amount", JSON.stringify(!hideAmountByDefault));
  };
  const handleHideAmount = () => {
    setHideAmount(!hideAmount);
  };
  const newestTransaction = stats?.transactionstats.newest;
  const isPayout = newestTransaction?.isPayout;
  console.log(hideAmount, hideAmountByDefault);
  return (
    <div
      className="col-span-1 p-6 rounded-3xl h-60 backdrop-blur-[60px]"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div
        className="rounded-3xl h-[100px] w-full flex justify-between items-center"
        style={{
          background:
            "linear-gradient(127deg, rgba(34, 41, 78, 0.94) -4.23%, rgba(10, 14, 35, 0.49) 76.75%)",
        }}
      >
        <div className="px-4 ">
          <p className="text-sm font-medium mb-0.5 flex gap-2 items-center">
            Total balance{" "}
            {hideAmount ? (
              <IoEyeOffOutline onClick={handleHideAmount} />
            ) : (
              <MdOutlineRemoveRedEye onClick={handleHideAmount} />
            )}
          </p>
          <h1 className="text-4xl font-bold">
            {hideAmount
              ? "XXXX"
              : `${stats ? `$${stats?.amountstats?.totalAmount}` : "N/A"}`}
          </h1>
        </div>
        <div className="h-full rounded-3xl relative p-3 py-2 flex justify-end bg-shadow bg-cover bg-no-repeat w-[140px]">
          <Popover>
            <PopoverTrigger className="h-fit">
              <Image src={more} alt="more" className="w-6 h-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="flex gap-3 bg-[rgba(34,41,78,0.94)] text-white p-4 ">
              <input
                type="checkbox"
                name="hide-amount"
                id="hide-amount"
                checked={hideAmountByDefault}
                onChange={handleHideAmountByDefault}
              />
              <label htmlFor="hide-amount" className="text-sm font-medium">
                Hide amount by default
              </label>
            </PopoverContent>
          </Popover>
          <Image
            src={graph}
            alt="graph"
            className="absolute right-4 top-[50%] translate-y-[-50%] transform"
          />
        </div>
      </div>
      <p className="text-xs mt-4 text-gray-400 font-medium ">NEWEST</p>

      {isLoading ? (
        <div className="flex items-center gap-5 mt-2">
          <Skeleton className="h-8 w-14" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ) : (
        <div className="flex justify-between gap-2 mt-2 items-center w-full ">
          <div className="w-[15%]">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ico_bg">
              <Image src={domain} alt="domain" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex justify-between items-center w-[85%]">
            <div>
              {newestTransaction && (
                <h3 className="text-sm font-medium">
                  {isPayout
                    ? `Payout to ${(newestTransaction as Payout).beneficiary}`
                    : (newestTransaction as Payment).plan}
                </h3>
              )}

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
      )}
    </div>
  );
};

export default CreditBalance;
