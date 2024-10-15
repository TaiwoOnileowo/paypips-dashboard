"use client";

import { BadgePercent, TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with a custom label";

const chartData = [
  { browser: "Professional", visitors: 275, fill: "#CB3CFF" },
  { browser: "Growth", visitors: 200, fill: "#0075FF" },
  { browser: "Basic", visitors: 187, fill: "#57C3FF" },
];

const chartConfig = {
  visitors: {
    label: "Professional",
    color: "#CB3CFF",
  },
  chrome: {
    label: "Growth",
    color: "#0075FF",
  },
  safari: {
    label: "Basic",
    color: "#57C3FF",
  },
} satisfies ChartConfig;

export default function PlanChart() {
  return (
    <Card
      className="border-none rounded-3xl col-span-4"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
      }}
    >
      <CardHeader className="flex w-full flex-row justify-between items-center space-y-2 pb-4">
        <div>
          <CardTitle className="text-sm font-medium text-slate-50 font-plus flex items-center">
            <BadgePercent className="h-4 w-4 text-muted-foreground inline mr-2" />{" "}
            Plan Distribution
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 36,
              right: 24,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="visitors"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visitors)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-white"
                fontSize={12}
                dataKey="browser"
                // formatter={(value: keyof typeof chartConfig) =>
                //   chartConfig[value]?.label
                // }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Professional Plan is up by 5% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total users by plan for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
