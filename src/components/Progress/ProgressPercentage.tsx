import { formatNumber } from "@/lib/formatters";
import React from "react";
import CircularProgress from "./CircularProgress/CircularProgress";

function ProgressPercentage({value = 0}: {value?: number}) {
  return (
    <div className="flex items-center gap-5">
      <CircularProgress value={value} />
      {formatNumber(value)}%
    </div>
  );
}

export default ProgressPercentage;
