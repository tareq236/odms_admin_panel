"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

export default function DateFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  return (
    <Select
      onValueChange={(value) => {
        if (value) {
          params.set("filter", value);
          params.delete("p");
        } else {
          params.delete("filter");
          params.delete("p");
        }

        router.push(pathname + "?" + params.toString());
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select date filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="d">Last day</SelectItem>
          <SelectItem value="w">This Week</SelectItem>
          <SelectItem value="m">This Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
