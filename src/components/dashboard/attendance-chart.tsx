"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { chartData } from "@/lib/data";

const chartConfig = {
  حاضر: {
    label: "حاضر",
    color: "hsl(var(--chart-1))",
  },
  متأخر: {
    label: "متأخر",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>نظرة عامة على الحضور</CardTitle>
        <CardDescription>ملخص الحضور خلال الأسبوع الماضي</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 0, left: -25, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="حاضر" fill="var(--color-حاضر)" radius={4} />
                <Bar dataKey="متأخر" fill="var(--color-متأخر)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
