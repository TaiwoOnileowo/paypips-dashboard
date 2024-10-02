"use client";
import React, { useState } from "react";
import search from "@/assets/icons/search.svg";
import Image from "next/image";
import { Session } from "next-auth";

import { TablePagination } from "@mui/material";

import { useGetPayments } from "@/hooks/reactQueryHooks";
import { Skeleton } from "@/components/ui/skeleton";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

import Error from "./Error";
import NotFound from "./NotFound";
const PaymentsTable = ({ session }: { session: Session }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, error } = useGetPayments({
    session,
    page: currentPage,
    limit: limit,
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
    // Display skeleton loaders while data is being fetched
    return (
      <div
        className="rounded-3xl w-full p-5"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between items-center">
          <h2 className="text-white text-lg font-medium">Incoming Payments</h2>
          {/* <div className="flex gap-3 items-center text-white max-md:pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
              <Image src={search} alt="search" width={20} height={20} />
              <input
                type="text"
                className="px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
            <FilterListRoundedIcon className="cursor-pointer text-white" />
          </div> */}
        </div>
        <div className="max-md:mt-2 mt-5 w-full text-white overflow-auto">
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
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr
                  key={index}
                  className="font-medium border-t p-4 border-[#56577A]/50"
                >
                  <td className="text-left">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-44" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-28" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    console.log(error, "error");
    return (
      <div
        className="rounded-3xl w-full p-5 pb-10"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between items-center">
          <h2 className="text-white text-lg font-medium">Incoming Payments</h2>
          {/* <div className="flex gap-3 items-center text-white max-md:pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
              <Image src={search} alt="search" width={20} height={20} />
              <input
                type="text"
                className="px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
            <FilterListRoundedIcon className="cursor-pointer text-white" />
          </div> */}
        </div>
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
        <Error message="An error occurred while fetching payments" />
      </div>
    );
  }
  const payments = data.payments;
  const pagination = data.pagination;
  console.log(data);

  return (
    <div
      className="rounded-3xl w-full p-5"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between items-center">
        <h2 className="text-white text-lg font-medium">Incoming Payments</h2>
        {/* <div className="flex gap-3 items-center text-white max-md:pt-3">
          <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
            <Image src={search} alt="search" width={20} height={20} />
            <input
              type="text"
              className="px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <FilterListRoundedIcon className="cursor-pointer text-white" />
        </div> */}
        {/* TO-BE-IMP */}
      </div>
      <div className="max-md:mt-2 mt-5 w-full text-white overflow-auto">
        {payments.length > 0 ? (
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
            <tbody>
              {payments.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="font-medium border-t p-4 border-[#56577A]/50"
                  >
                    <td className="text-left font-medium max-md:text-sm">
                      {item.email}
                    </td>
                    <td className="text-left text-sm font-medium max-md:text-xs">
                      {item.plan}
                    </td>
                    <td className="text-left text-sm max-md:text-xs">
                      ${item.amount}
                    </td>
                    <td className="text-left text-sm max-md:text-xs">
                      {item.method}
                    </td>
                    <td className="text-left text-sm max-md:text-xs">
                      {item.date}
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
            <NotFound message="No payments yet" />
          </div>
        )}
      </div>
      {payments.length === limit && currentPage === 0 && (
        <TablePagination
          component="div"
          count={pagination.totalItems}
          page={currentPage}
          className="text-white"
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </div>
  );
};

export default PaymentsTable;
