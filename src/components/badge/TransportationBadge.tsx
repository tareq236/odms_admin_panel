import React from "react";
import { Badge } from "../ui/badge";

export default function CustomBadge({index, title}: {index: number, title: string}) {
  return (
    <Badge
      className={`hover:bg-inital text-nowrap text-[10px] ${
        title === "Rickshaw"
          ? "bg-yellow-400 text-yellow-900"
          : title === "Auto Rickshaw"
          ? "bg-teal-600"
          : title === "Company Car"
          ? "bg-rose-600 text-rose-50"
          : index % 2 === 0
          ? "bg-fuchsia-200 text-fuchsia-900"
          : ""
      }`}
    >
      {title}
    </Badge>
  );
}
