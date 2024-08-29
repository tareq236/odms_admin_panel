import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/formatters";
import React from "react";

type CardProps = {
  title: string;
  count: number;
};

export default function Card({ title, count }: CardProps) {
  return (
    <article className="card flex items-center gap-5 border rounded-md px-6 py-2">
      <h6 className="text-[12px] text-gray-500">{title}</h6>
      <Separator orientation="vertical" className="h-5" />
      <h5 className="text-xl text-primary">
        {formatNumber((count))}
      </h5>
    </article>
  );
}
