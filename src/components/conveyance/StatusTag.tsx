import React from "react";
import { Badge } from "../ui/badge";
import { titleCase } from "@/lib/formatters";

export default function StatusTag({ name }: { name: string }) {
  return (
    <>
      <Badge
        className={
          name === "end"
            ? "text-teal-900 bg-teal-200 hover:bg-teal-200/90"
            : name === "live"
            ? "text-yellow-900 bg-yellow-200 hover:bg-yellow-200/90"
            : ""
        }
      >
        {titleCase(name)}
      </Badge>
    </>
  );
}
