"use client";
import React from "react";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import Transactions from "../../Transactions";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/hooks/reactQueryHooks";
import Error from "../../Error";
import NotFound from "../../NotFound";
import Parent from "./Parent";
const RecentTransactions = ({ session }: { session: Session }) => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactions(session);

  if (isLoading) {
    return (
      <Parent>
        <div className="mt-4 flex flex-col gap-4">
          {[...Array(8)].map((_, idx) => (
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
      </Parent>
    );
  }

  if (isError || !transactions) {
    console.log(error, "error");
    return (
      <Parent>
        <Error message="An error occurred while fetching recent transactions" />
      </Parent>
    );
  }

  return (
    <Parent>
      {transactions.length > 0 ? (
        <>
          <Transactions
            name="Newest"
            transactions={transactions?.slice(0, 3)}
          />
          <Transactions
            name="Previously"
            transactions={transactions?.slice(3, 7)}
          />
        </>
      ) : (
        <NotFound message="No recent transactions" />
      )}
    </Parent>
  );
};

export default RecentTransactions;
