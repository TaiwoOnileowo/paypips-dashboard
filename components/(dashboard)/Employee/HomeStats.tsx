"use client";
import React from "react";
import { Session } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employeeStats } from "@/lib/data/dashboarddata";
import { useGetClients, useGetRevenue } from "@/hooks/employeeApiHooks";
const HomeStats = ({ session }: { session: Session }) => {
  const { data: clients } = useGetClients(session);
  const { data: revenue } = useGetRevenue(session);
  let updatedHomeStats = employeeStats;
  if (clients && revenue) {
    updatedHomeStats = employeeStats.map((stat) => {
      switch (stat.title) {
        case "Active Clients":
          return {
            ...stat,
            value: clients.total,
            percent: `${clients.increase} since last month`,
          };
        case "Total Amount Processed":
          return {
            ...stat,
            value: revenue.totalAmountProcessed,
            percent: `${revenue.todayAmountProcessedIncrease}% from yesterday`,
          };
        case "Total Income":
          return {
            ...stat,
            value: revenue.totalAmountProcessed,
            percent: `${revenue.monthAmountProcessedIncrease}% from yesterday`,
          };
        default:
          return stat;
      }
    });
    console.log(revenue.totalAmountProcessed, updatedHomeStats);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {updatedHomeStats.map((stat, index) => {
        const isPositive = stat.percent.includes("+");
        return (
          <Card
            key={index}
            x-chunk={`dashboard-01-chunk-${index}`}
            className="rounded-3xl border-none"
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
          >
            <CardHeader className="flex flex-row text-slate-400 items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-50 font-plus">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white  font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  isPositive ? "text-slate-400" : "text-red-400"
                }`}
              >
                {stat.percent}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HomeStats;
