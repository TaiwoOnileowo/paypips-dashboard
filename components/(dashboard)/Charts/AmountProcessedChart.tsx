"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Bitcoin } from "lucide-react";
import { Session } from "next-auth";
import { useGetRevenue } from "@/hooks/employeeApiHooks";

const chartConfig = {
  amountProcessed: {
    label: "Amount",
  },
  amount: {
    label: "Amount",
    color: "#0075FF",
  },
} satisfies ChartConfig;

export default function AmountProcessedChart({
  session,
}: {
  session: Session;
}) {
  const { data: revenue, isLoading } = useGetRevenue(session);
  const chartData = revenue?.amountProcessedPerDayChart;

  return (
    <Card
      className="rounded-3xl border-none mt-6"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center text-slate-50 font-plus">
          <Bitcoin className="h-4 w-4 text-muted-foreground inline mr-2" />
          Amount Processed
        </CardTitle>
        {isLoading ? (
          <div className="mt-2">
            <Skeleton className="h-8 w-24 bg-slate-700" />
          </div>
        ) : (
          <CardDescription className="text-2xl mt-2 text-white flex flex-col font-bold">
            <>
              {revenue?.totalAmountProcessed}
              <span className={`text-xs text-slate-400 mt-1`}>
                {revenue?.todayAmountProcessedIncrease}% from yesterday
              </span>
            </>
          </CardDescription>
        )}
      </CardHeader>
      {isLoading ? (
        <div className="px-2 sm:p-6">
          <ChartSkeleton />
        </div>
      ) : (
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#94a3b8"
                strokeOpacity={0.2}
              />
              <XAxis
                tick={{ fill: "#94a3b8" }}
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    style={{
                      background:
                        "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
                    }}
                    className="w-[150px]"
                    nameKey="amountProcessed"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                dataKey={"amount"}
                type="monotone"
                stroke={`#0075FF`}
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[250px] w-full bg-slate-700" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[100px] bg-slate-700" />
        <Skeleton className="h-4 w-[100px] bg-slate-700" />
      </div>
    </div>
  );
}
