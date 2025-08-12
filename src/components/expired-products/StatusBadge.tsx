import React from "react";
import { Badge } from "../ui/badge";
import { WithdrawalStatus } from "@/types/request-list";

export default function StatusBadge({ status }: { status: WithdrawalStatus }) {
  return (
    <Badge
      variant={"outline"}
      data-state={status.replace("_",'-')}
      className="data-[state=withdrawal-approved]:text-emerald-700 data-[state=withdrawal-approval]:text-orange-700 data-[state=withdrawal-pending]:text-yellow-500 text-xs"
    >
      {status.replace("_",' ')}
    </Badge>
  );
}
