import { cn } from "@/lib/utils";
import React from "react";

function Spinner({
  color = "primary",
  className
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      aria-label="Loading"
      className="relative inline-flex flex-col gap-2 items-center justify-center"
    >
      <div className={cn(`relative flex w-[1rem] aspect-square`, className)}>
        <i
          className={`absolute w-full h-full rounded-full animate-spin duration-[800] ease-in-out border-2 border-t-transparent border-l-transparent border-r-transparent border-3 border-b-${color}`}
        ></i>
        <i
          className={`absolute w-full h-full rounded-full opacity-100 duration-[800] animate-spin ease-linear border-2 border-dotted border-t-transparent border-l-transparent border-r-transparent border-3 border-b-${color}`}
        ></i>
      </div>
    </div>
  );
}

export default Spinner;