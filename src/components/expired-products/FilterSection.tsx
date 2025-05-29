import React from "react";
import Search from "../ui/Search";

export default function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <div className="flex flex-wrap gap-3">
        <Search placeholder="Search by DA id" />
      </div>

      {/* export button */}
      {/* <ExportSection /> */}
    </section>
  );
}
