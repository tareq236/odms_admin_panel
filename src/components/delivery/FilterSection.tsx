import React from "react";
import Search from "../ui/Search";
import DatePicker from "../ui/DatePicker";
import ExportSection from "./collection/ExportSection";

export default function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <div className="flex flex-wrap gap-3">
        <DatePicker />
        <Search placeholder="Search by DA code" />
      </div>
      
      {/* export button */}
      <ExportSection />
    </section>
  );
}
