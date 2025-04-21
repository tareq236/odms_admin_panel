"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

export default function RangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: searchParams.has("start")
      ? new Date(searchParams.get("start") as string)
      : undefined,
    to: searchParams.has("end")
      ? new Date(searchParams.get("end") as string)
      : undefined,
  });

  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  React.useEffect(() => {
    if (date != undefined) {
      if (date.from) {
        params.set("start", format(date.from, "yyyy-MM-dd"));
        params.delete("p");
        params.delete("q");
        params.delete("filter");
      }
      if (date.to != undefined) {
        params.set("end", format(date.to, "yyyy-MM-dd"));
        params.delete("p");
        params.delete("q");
        params.delete("filter");
      }
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete("start");
      params.delete("end");
      params.delete("p");
      params.delete("q");
      params.delete("filter");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {searchParams.has('start') && date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
