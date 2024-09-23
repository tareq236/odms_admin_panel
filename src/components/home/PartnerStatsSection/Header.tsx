"use client";

import Search from "@/components/ui/Search";
import { Users } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="header flex justify-between items-center gap-5">
      <div className="flex gap-2 items-center">
        <div className="icon rounded-full text-primary">
          <Users className="size-5 fill-primary/20" />
        </div>
        <h1 className="text-2xl">Partner Delivery Statistics</h1>
      </div>

      <Search placeholder="Search by partner id" />
    </div>
  );
}

export default Header;
