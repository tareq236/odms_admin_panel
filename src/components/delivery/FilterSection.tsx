import React from "react";
import DatePicker from "../ui/DatePicker";
import ExportSection from "./collection/ExportSection";
import Search from "../ui/Search";

export default function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <div className="flex flex-wrap gap-3">
        <DatePicker />
        <Search placeholder="Search by DA id" />
      </div>
      
      {/* export button */}
      <ExportSection />
    </section>
  );
}
