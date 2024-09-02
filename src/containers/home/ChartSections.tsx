"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartData } from "@/app/admin/page"
import { formatDate } from "@/lib/formatters"

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Count",
  },
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
  absence: {
    label: "Absence",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartSection({data, count}: {data: CartData[], count: number}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("attendance")

    let cartList: any[] = []

    for (let i=0; i < data.length; i++) {
        cartList.push({
            date: data[i].day,
            attendance: Number(data[i].total_attendance),
            absence: count - Number(data[i].total_attendance) ,
        })
    }


  const total = React.useMemo(
    () => ({
      attendance: cartList[cartList.length - 1].attendance,
      absence: cartList[cartList.length - 1].absence,
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Monthly Attendance</CardTitle>
          <CardDescription>
            Showing total attendance for the last month
          </CardDescription>
        </div>
        <div className="flex">
            
          {["attendance", "absence"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground text-nowrap">
                  {chartConfig[chart].label} (Today)
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={cartList}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value, payload) => {
                    return formatDate(payload[0].payload.date)
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
