import React from "react";
import { Badge } from "../ui/badge";

export default function StatusBadge({
  status,
}: {
  status: "request_approved" | "request_pending";
}) {
  return (
    <Badge
      variant={"outline"}
      data-state={status === "request_approved" ? "approved" : "pending"}
      className="data-[state=approved]:text-emerald-700 data-[state=pending]:text-yellow-500 text-xs"
    >
      {status === "request_approved"
        ? "Approved"
        : status === "request_pending"
        ? "Pending"
        : status}
    </Badge>
  );
}
