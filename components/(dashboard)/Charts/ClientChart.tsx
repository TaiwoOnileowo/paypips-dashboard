"use client";

import { Activity } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: "Previous",
    color: "#0075FF",
  },
  mobile: {
    label: "New",
    color: "#CB3CFF",
  },
} satisfies ChartConfig;

export default function ClientChart() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <Card
      className="flex flex-col col-span-4 rounded-3xl border-none"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
      }}
    >
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />{" "}
            <ChartLegend
              content={<ChartLegendContent />}
              payload={[
                {
                  value: chartConfig.desktop.label,
                  type: "circle",
                  color: chartConfig.desktop.color,
                  dataKey: "desktop",
                },
                {
                  value: chartConfig.mobile.label,
                  type: "circle",
                  color: chartConfig.mobile.color,
                  dataKey: "mobile",
                },
              ]}
              fill="white"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-white text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-slate-400"
                        >
                          Clients
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.desktop.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill={chartConfig.mobile.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Active Clients <Activity className="h-4 w-4" />
        </div>
        <div className="leading-none text-xs text-slate-400">
          +20.1% from last month
        </div>
      </CardFooter>
    </Card>
  );
}
