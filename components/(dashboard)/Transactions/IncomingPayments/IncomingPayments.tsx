"use client";

import React, { useState, useRef } from "react";
import { Session } from "next-auth";

import { TablePagination } from "@mui/material";
import { useGetPayments } from "@/hooks/clientApiHooks";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "../../Error";
import Parent from "./Parent";
import NotFound from "../../NotFound";
const IncomingPayments = ({ session }: { session: Session }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, error } = useGetPayments({
    session,
    page: currentPage,
    limit: limit,
    query,
  });
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current && searchRef.current.value) {
      setQuery(searchRef.current?.value);
      return;
    }
    return;
  };
  if (isLoading) {
    // Display skeleton loaders while data is being fetched
    return (
      <Parent onSubmit={handleSubmit} isLoading={isLoading} ref={searchRef}>
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
      </Parent>
    );
  }

  if (isError || !data) {
    console.log(error, "error");
    return (
      <Parent onSubmit={handleSubmit} isLoading={isLoading} ref={searchRef}>
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
      </Parent>
    );
  }
  const payments = data.payments;
  const pagination = data.pagination;

  return (
    <Parent onSubmit={handleSubmit} isLoading={isLoading} ref={searchRef}>
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
      {!(currentPage === 0 && payments.length != limit) && (
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

export default IncomingPayments;
