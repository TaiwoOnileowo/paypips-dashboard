"use client";
import React from "react";
import { useGetAccountDetails } from "@/hooks/reactQueryHooks";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "../../Error";
import Parent from "./Parent";
import NotFound from "../../NotFound";
const AccountBalances = ({ session }: { session: Session }) => {
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useGetAccountDetails(session);

  if (isLoading) {
    return (
      <Parent>
        <div className="w-full flex flex-col items-center justify-center mt-3 gap-2">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="flex w-full mt-3  gap-3 items-center justify-between "
            >
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-14 h-4" />
            </div>
          ))}
        </div>
      </Parent>
    );
  }
  console.log(isLoading, "Isloading", isError);
  if (isError || !account) {
    console.log(error);
    return (
      <Parent>
        <Error message="An error occurred" />
      </Parent>
    );
  }
  const balances = account.balances;
  return (
    <Parent>
      {balances.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-3">
          {balances.map((balance, index) => (
            <div
              key={index}
              className="flex w-full mt-3  gap-3 items-center justify-between "
            >
              <h3 className="">{balance.name}</h3>
              <p className="text-gray-400">{balance.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <NotFound message="No account balance to show" />
      )}
    </Parent>
  );
};

export default AccountBalances;
