"use client";
import React from "react";
import { Session } from "next-auth";
import { useGetPayments, useGetRevenueStats } from "@/hooks/clientApiHooks";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import checkgreen from "@/assets/icons/check-green.svg";
import cart from "@/assets/icons/cart-blue.svg";

import Error from "../Error";
import NotFound from "../NotFound";
const RecentPayments = ({ session }: { session: Session }) => {
  const { data: revenueStats } = useGetRevenueStats(session);
  const { data, isLoading, isError, error } = useGetPayments({
    session,
    page: 1,
    limit: 4,
    query: "",
  });

  if (isLoading) {
    // Display skeleton loaders while data is being fetched
    return (
      <div
        className="col-span-6 xl:col-span-4 max-xl:max-h-[350px] h-full  p-6 text-white rounded-3xl basis-1/3"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
        }}
      >
        <h2 className="font-bold text-lg">Payment&apos;s overview</h2>

        {/* Skeleton for the stats */}
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Skeleton for the payments list */}
        <div className="mt-7 space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-start gap-5" key={index}>
              <Skeleton className="h-8 w-10" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    console.log(error, "error");
    return (
      <div
        className="col-span-6 xl:col-span-4 max-xl:max-h-[350px] h-full  p-6 text-white rounded-3xl basis-1/3"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
        }}
      >
        <h2 className="font-bold text-lg">Payment&apos;s overview</h2>
        <Error message="An error occurred while fetching payments" />
      </div>
    );
  }
  const payments = data?.payments;

  return (
    <div
      className="col-span-6 xl:col-span-4 max-xl:max-h-[350px] h-full  p-6 text-white rounded-3xl basis-1/3"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
      }}
    >
      <h2 className="font-bold  text-lg">Payment&apos;s overview</h2>
      {payments.length > 0 ? (
        <>
          <p className="text-gray-300/80 mt-1 flex items-center gap-2">
            <Image src={checkgreen} alt="checkgreen" width={15} height={15} />
            {revenueStats && revenueStats.monthRevenuePercentageIncrease
              ? `${
                  !revenueStats.monthRevenuePercentageIncrease.includes("-") &&
                  "+"
                }${revenueStats.monthRevenuePercentageIncrease}% this month`
              : "N/A"}
          </p>

          <div className="mt-6 w-full">
            {payments.map((item, index) => (
              <div className="flex items-center gap-5 mt-4 w-full" key={index}>
                <Image src={cart} alt="cart" width={24} height={24} />
                <div className="w-[calc(100%-25px)]">
                  <p className=" overflow-x-auto  max-w-full scrollbar whitespace-nowrap">
                    ${item.amount}, {item.plan}
                  </p>
                  <p className="text-sm text-gray-300/80 max-w-full whitespace-nowrap overflow-x-auto scrollbar ">
                    {item.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <NotFound message="No payments yet" />
      )}
    </div>
  );
};

export default RecentPayments;
