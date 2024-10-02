"use client";
import React from "react";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import Transactions from "../Transactions";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/hooks/reactQueryHooks";
import Error from "../Error";
import NotFound from "../NotFound";
const RecentTransactions = ({ session }: { session: Session }) => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactions(session);

  if (isLoading) {
    return (
      <div
        className="col-span-2 text-white p-6 min-h-[520px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between w-full items-center">
          <h3 className="font-medium text-lg">Recent Transactions</h3>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {[...Array(6)].map((_, idx) => (
            <div className="flex items-center gap-5 mt-2" key={idx}>
              <Skeleton className="h-8 w-14" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !transactions) {
    console.log(error, "error");
    return (
      <div
        className="col-span-4 text-white p-6 min-h-[520px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between w-full items-center">
          <h3 className="font-medium text-lg">Recent Transactions</h3>
        </div>
        <Error message="An error occurred while fetching recent transactions" />
      </div>
    );
  }

  return (
    <div
      className="col-span-2 text-white p-6 min-h-[520px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between w-full items-center">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
      </div>
      {transactions.length > 0 ? (
        <>
          <Transactions
            name="Newest"
            transactions={transactions?.slice(0, 2)}
          />
          <Transactions
            name="Previously"
            transactions={transactions?.slice(2, 6)}
          />
        </>
      ) : (
        <NotFound message="No recent transactions" />
      )}
    </div>
  );
};

export default RecentTransactions;
