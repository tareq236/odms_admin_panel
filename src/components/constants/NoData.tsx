import { MessageSquareOff } from "lucide-react";
import React from "react";

export default function NoData({ message }: { message?: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-muted-foreground/80 py-10">
      <MessageSquareOff size={32} />
      <p className="text-xs">{message || "No data"}</p>
    </div>
  );
}
