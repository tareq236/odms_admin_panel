"use client";

import React from "react";
import DatePicker from "../ui/DatePicker";
import Search from "../ui/Search";

function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <DatePicker />
      <Search placeholder="Search by DA code" />
    </section>
  );
}

export default FilterSection;
