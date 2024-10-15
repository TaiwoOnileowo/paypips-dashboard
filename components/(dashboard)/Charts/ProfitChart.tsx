"use client";
import { useState } from "react";
import { ChartSpline, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ProfitChart() {
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <Card
      className="rounded-3xl border-none col-span-5 "
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <CardHeader className="flex w-full flex-row justify-between items-center space-y-2 pb-4">
        <div>
          <CardTitle className="text-sm font-medium text-slate-50 font-plus  flex items-center">
            <ChartSpline className="h-4 w-4 text-muted-foreground inline mr-2" />{" "}
            Total Profit
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
      <CardContent className="flex flex-col justify-end h-[calc(100%-120px)]">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#CB3CFF" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-[#94a3b8]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
