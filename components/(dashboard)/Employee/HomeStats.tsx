import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employeeStats } from "@/lib/data/dashboarddata";
const HomeStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {employeeStats.map((stat, index) => {
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
