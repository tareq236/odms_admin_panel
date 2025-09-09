"use client";

import React from "react";
import DatePicker from "../ui/DatePicker";
import Search from "../ui/Search";

function FilterSection() {

  return (
    <section className="filter-section flex-wrap">
      <DatePicker />

      <div className="right flex gap-5 flex-wrap">
        <Search placeholder="Search by DA code" />
      </div>
    </section>
  );
}

export default FilterSection;
