import { Search } from "lucide-react";
import React from "react";

function SearchDa() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-muted-foreground/80">
      <Search size={32} />
      <p className="text-xs">Search by DA code</p>
    </div>
  );
}

export default SearchDa;
