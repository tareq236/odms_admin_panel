"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const tabList = [
  {
    id: 1,
    title: "Delivery List",
    params: "delivery_list",
  },
  {
    id: 2,
    title: "Delivery Pending",
    params: "delivery_pending_list",
  },
  {
    id: 3,
    title: "Delivered List",
    params: "delivered_list",
  },
];

export default function TabSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const validatedParams = searchParams.get("replacement") ?? tabList[0].params;

  return (
    <section className="overflow-x-auto mb-6 w-full">
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
              params.set("replacement", item.params);
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
