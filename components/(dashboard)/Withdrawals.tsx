"use client";
import React, { useState } from "react";

import { Session } from "next-auth";

import { useGetPayouts } from "@/hooks/reactQueryHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { TablePagination } from "@mui/material";

import Error from "./Error";
import NotFound from "./NotFound";
import Parent from "./Transactions/Withdrawals/Parent";

const Withdrawals = ({ session }: { session: Session }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, error } = useGetPayouts({
    session,
    page: currentPage,
    limit,
  });
  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (isLoading) {
    return (
      <Parent>
        <div className="max-md:mt-2 mt-5 w-full text-white overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className=" text-left max-md:text-sm">
                <th className=" text-left">Amount</th>
                <th className=" text-left">Currency</th>
                <th className=" text-left">Status</th>
                <th className=" text-left">Date</th>
                <th className=" text-left">Time</th>
                <th className=" text-left">Beneficiary</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr
                  key={index}
                  className="font-medium border-t p-4 border-[#56577A]/50"
                >
                  <td className="text-left">
                    <Skeleton className="h-4 w-52" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Parent>
    );
  }
  if (isError || !data) {
    console.log(error, "error");
    return (
      <Parent>
        <table className="w-full table-auto ">
          <thead className="">
            <tr className=" text-left max-md:text-sm">
              <th className=" text-left">Amount</th>
              <th className=" text-left">Currency</th>
              <th className=" text-left">Status</th>
              <th className=" text-left">Date</th>
              <th className=" text-left">Time</th>
              <th className=" text-left">Beneficiary</th>
            </tr>
          </thead>
        </table>
        <Error message="An error occurred while fetching payouts" />
      </Parent>
    );
  }
  const payouts = data.payouts;
  const pagination = data.pagination;
  return (
    <Parent>
      <div className="mt-5 overflow-auto max-md:mt-2 w-full text-white">
        {payouts.length > 0 ? (
          <table className="w-full table-auto ">
            <thead className="">
              <tr className=" text-left max-md:text-sm">
                <th className=" text-left">Amount</th>
                <th className=" text-left">Currency</th>
                <th className=" text-left">Status</th>
                <th className=" text-left">Date</th>
                <th className=" text-left">Time</th>
                <th className=" text-left">Beneficiary</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="font-medium border-t p-4 border-[#56577A]/50 "
                  >
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.amount}
                    </td>
                    <td className=" text-left text-sm font-medium max-md:text-xs">
                      {item.currency}
                    </td>

                    <td className={`text-left text-xs `}>
                      <span
                        className={`w-[80px] p-1 capitalize rounded-md items-center flex justify-center ${
                          item.status === "pending"
                            ? "border"
                            : item.status.includes("failed")
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.date}
                    </td>
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.time}
                    </td>
                    <td className=" text-left font-medium max-md:text-sm">
                      {item.beneficiary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left max-md:text-sm">
                  <th className="text-left">Email</th>
                  <th className="text-left">Plan</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Method</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
            </table>
            <NotFound message="No payouts yet" />
          </div>
        )}
      </div>
      {!(currentPage === 0 && payouts.length != limit) && (
        <TablePagination
          component="div"
          count={pagination.totalItems}
          page={currentPage}
          className="!text-white"
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Parent>
  );
};

export default Withdrawals;
