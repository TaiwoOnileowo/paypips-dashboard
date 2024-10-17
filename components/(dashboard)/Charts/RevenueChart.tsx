"use client";
import React, { useState } from "react";

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { weeklyData, monthlyData } from "@/lib/data/chartData";
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState("90d");

  const chartData = timeRange === "7d" ? weeklyData : monthlyData;
  return (
    <Card
      className="col-span-7 h-fit rounded-3xl border-none"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
      }}
    >
      <CardHeader className="flex w-full flex-row justify-between items-center space-y-2 pb-4">
        <div>
          <CardTitle className="text-sm font-medium  flex items-center text-slate-50 font-plus">
            <CreditCard className="h-4 w-4 text-muted-foreground inline mr-2" />{" "}
            Total Revenue
          </CardTitle>
          <CardDescription className="text-2xl mt-2 text-white flex flex-col  font-bold">
            $240.8k
            <span className={`text-xs text-slate-400 mt-1`}>
              +20.1% from last month
            </span>
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto bg-transparent shadow-none border-none"
            aria-label="Select a value"
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
            }}
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent
            className="rounded-xl"
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
            }}
          >
            <SelectItem value="90d" className="rounded-lg">
              Monthly
            </SelectItem>

            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -10,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="colorRv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#575DFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#575DFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#57C3FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#57C3FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#94a3b8"
              strokeOpacity={0.2}
            />
            <XAxis
              dataKey={timeRange === "7d" ? "day" : "month"}
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) => `$${value}`}
              tickMargin={6}
              tickCount={7}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="expenses"
              type="natural"
              fillOpacity={0.4}
              fill="url(#colorEx)"
              stroke="#57C3FF"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fillOpacity={0.4}
              fill="url(#colorRv)"
              stroke="#CB3CFF"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
