import React from "react";
import Search from "../ui/Search";
import DatePicker from "../ui/DatePicker";

export default function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <DatePicker />
      <Search placeholder="Search by DA code" />
    </section>
  );
}
