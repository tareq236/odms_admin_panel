"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const tabList = [
  {
    id: 1,
    title: "Request List",
    params: "request_approved",
  },
  {
    id: 2,
    title: "Withdrawal Pending",
    params: "withdrawal_pending",
  },
  {
    id: 3,
    title: "Withdrawal Approval",
    params: "withdrawal_approval",
  },
  {
    id: 4,
    title: "Withdrawal Approved",
    params: "withdrawal_approved",
  },
];

export default function TabSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const validatedParams = searchParams.get("withdrawal") ?? "request_approved";

  return (
    <section className="overflow-x-auto mb-6">
      <div className="flex items-center gap-3 border-b">
        {tabList.map((item) => (
          <Button
            key={item.id}
            variant={"ghost"}
            className={`${
              validatedParams === item.params
                ? "border-b-2 border-primary rounded-b-none"
                : ""
            } transition-all duration-300`}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("withdrawal", item.params);
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </section>
  );
}
