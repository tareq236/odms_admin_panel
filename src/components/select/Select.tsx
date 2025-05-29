"use client";

import React from "react";
import {
  Select as SelectUi,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { SelectProps } from "@radix-ui/react-select";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Select({
  placeholder,
  className,
  data,
  paramName,
  ...props
}: SelectProps & {
  className?: string;
  placeholder?: string;
  paramName?: string;
  data?: {
    label: string;
    value: string;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <SelectUi
      {...props}
      defaultValue={paramName && searchParams.get(paramName) || undefined }
      onValueChange={(value) => {
        if (paramName) {
          const params = new URLSearchParams(searchParams);

          params.set(paramName, value);

          router.push(`${pathname}?${params.toString()}`);
        }
      }}
    >
      <SelectTrigger className={cn("md:max-w-[200px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data && data.length > 0 ? (
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="null" disabled>
              No Data.
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </SelectUi>
  );
}
