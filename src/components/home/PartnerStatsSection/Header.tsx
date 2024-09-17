"use client";

import Search from "@/components/ui/Search";
import React from "react";

function Header() {
  return (
    <div className="header flex justify-between items-center gap-5">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Partner Delivery Statistics
      </h3>

      <Search placeholder="Search by partner id" />
    </div>
  );
}

export default Header;
