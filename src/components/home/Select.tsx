"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";

export default function ChartMonthSelect() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const currentData = new Date();

  return (
    <Select
      defaultValue={`${currentData.getMonth()}`}
      onValueChange={(value) => {
        params.set("m", value);
        params.delete("p");

        router.push(pathname + "?" + params.toString());
      }}
    >
      <SelectTrigger className="md:max-w-[180px] sm:grow">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={`${currentData.getMonth()}`}>
            This month
          </SelectItem>
          <SelectItem value={`${currentData.getMonth() - 1}`}>
            Last month
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
