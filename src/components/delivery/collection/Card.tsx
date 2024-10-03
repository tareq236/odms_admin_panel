"use client";

import { TakaSign } from "@/assets";
import { formatNumber } from "@/lib/formatters";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type CardProps = {
  icon: React.ReactNode;
  name: string;
  stats: number;
  amount: number;
  paramString: string;
  isDown?: boolean;
};

function Card({
  icon,
  name,
  stats,
  paramString,
  amount = 0,
  isDown = false,
}: CardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  return (
    <article
      className={`flex gap-2 flex-col justify-center border rounded px-4 py-2 cursor-pointer ${
        searchParams.get("status") === paramString
          ? isDown
            ? "bg-red-100 border-red-100"
            : "bg-green-100 border-green-100"
          : ""
      }`}
      onClick={() => {
        if (searchParams.get("status") === paramString) {
          params.delete("p");
          params.delete("status");
        } else {
          params.set("status", paramString);
          params.delete("p");
        }
        router.push(pathname + "?" + params.toString());
      }}
    >
      {/* top */}
      <div className="flex items-center gap-2">
        <span
          className={`icon bg-blue-50 p-1 rounded text-primary ${
            searchParams.get("status") === paramString
              ? isDown
                ? "text-red-800 bg-red-200"
                : "text-teal-800 bg-green-200"
              : ""
          }`}
        >
          {icon}
        </span>
        <h4
          className={`${
            searchParams.get("status") === paramString
              ? isDown
                ? "text-red-700"
                : "text-green-700"
              : "text-muted-foreground"
          } text-xs`}
        >
          {name}
        </h4>
      </div>

      {/* bottom */}
      <div
        className={`flex justify-between items-end w-full ${
          searchParams.get("status") === paramString
            ? isDown
              ? "text-red-800"
              : "text-green-800"
            : ""
        }`}
      >
        <h5 className="text-xl font-medium flex items-center gap-1">
          <TakaSign /> {formatNumber(amount)}
        </h5>
        <h6
          className={`px-4 py-0.25  text-xs font-semibold rounded-full ${
            isDown ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }  ${searchParams.get("status") === paramString  ? isDown ? "border border-red-300" : "border border-green-300" : ''} `}
        >
          {formatNumber(stats)}
        </h6>
      </div>
    </article>
  );
}

export default Card;
