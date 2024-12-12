"use client";

import React from "react";
import DatePicker from "../ui/DatePicker";
import Search from "../ui/Search";

export default function FilterSection() {
  return (
    <section className="filter-section flex-wrap">
      <DatePicker />
      <Search placeholder="Search by DA code" />
    </section>
  );
}
