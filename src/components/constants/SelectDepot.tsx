import { MousePointer2 } from "lucide-react";
import React from "react";

export default function SelectDepot() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-muted-foreground/80 py-10">
      <MousePointer2 size={32} />
      <p className="text-xs">Select a depot</p>
    </div>
  );
}
