"use client";

import React, { useEffect, useState } from "react";
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
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
   if(searchParams.has("filter") === false) {
    setFilter('')
   } 
  }, [searchParams]);

  return (
    <Select
      value={filter}
      onValueChange={(value) => {
        if (value) {
          params.set("filter", value);
          params.delete("p");
          params.delete("start");
          params.delete("end");
          setFilter(value);
        } else {
          params.delete("filter");
          params.delete("p");
          params.delete("start");
          params.delete("end");
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
