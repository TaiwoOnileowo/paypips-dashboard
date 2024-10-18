"use client";

import { BadgePercent, TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
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
import { Session } from "next-auth";
import { useGetSubscriptions } from "@/hooks/employeeApiHooks";

const chartConfig = {
  professional: {
    label: "Professional",
    color: "#CB3CFF",
  },
  growth: {
    label: "Growth",
    color: "#0075FF",
  },
  basic: {
    label: "Basic",
    color: "#57C3FF",
  },
} satisfies ChartConfig;

export default function PlanChart({ session }: { session: Session }) {
  const { data: subscriptions, isLoading } = useGetSubscriptions(session);
  const chartData = subscriptions?.subscriptionsChartData;
  const mostIncreasedPlan = subscriptions?.mostIncreasedPlan;
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
              // top: 24,
              left: 36,
              right: 48,
              bottom:30
            }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="plan"
                  hideLabel
                  showDollarSign={false}
                />
              }
            />
            <CartesianGrid
              vertical={false}
              stroke="#94a3b8"
              strokeOpacity={0.2}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="#CB3CFF"
              strokeWidth={2}
              dot={{
                fill: "white",
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
                dataKey="plan"
                // formatter={(value: keyof typeof chartConfig) =>
                //   chartConfig[value]?.label
                // }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {mostIncreasedPlan && (
        <CardFooter className="flex-col items-center gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {mostIncreasedPlan.plan} is up by {mostIncreasedPlan.increase}% this
            month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total users by plan
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
