"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

export default function DatePicker() {
  const searchParams = useSearchParams();

  const [date, setDate] = React.useState<Date | undefined>(
    searchParams.has("start")
      ? new Date(searchParams.get("start") as string)
      : new Date(),
  );
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            params.set("start", format(value || new Date(), "yyyy-MM-dd"));
            params.delete("p");
            router.push(`${pathname}?${params.toString()}`);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
