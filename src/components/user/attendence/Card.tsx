"use client";

import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/formatters";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import React from "react";

type CardProps = {
  title: string;
  count: number;
  state: string;
};

export default function Card({ title, count, state }: CardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <article
      data-state={
        searchParams.has("status")
          ? searchParams.get("status") === state
          : state == "1"
      }
      className={`flex flex-1 items-center gap-5 border rounded-md px-6 py-2 cursor-pointer hover:bg-accent data-[state=true]:border-primary`}
      onClick={() => router.push("/admin/user/attendance?status=" + state)}
    >
      <h6 className="text-[12px] text-gray-500">{title}</h6>
      <Separator orientation="vertical" className="h-5" />
      <h5 className="text-xl text-primary">{formatNumber(count)}</h5>
    </article>
  );
}
