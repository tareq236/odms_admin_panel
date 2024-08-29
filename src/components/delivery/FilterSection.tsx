import React from "react";
import Search from "../ui/Search";
import RangePicker from "../ui/RangePicker";

export default function FilterSection() {
  return (
    <section className="filter-section">
      <RangePicker />
      <Search placeholder="Search by DA code" />
    </section>
  );
}
