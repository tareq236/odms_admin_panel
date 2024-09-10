import { Badge } from "@/components/ui/badge";
import React from "react";

function StatusTag({ status }: { status: string }) {
  return (
    <Badge
      className={
        status.toLowerCase() === "done"
          ? "bg-green-200 text-emerald-800 hover:bg-inital"
          : "bg-yellow-200 text-yellow-800 hover:bg-inital"
      }
    >
      {status.toLowerCase() === "done" ? "Done" : "Pending"}
    </Badge>
  );
}

export default StatusTag;
