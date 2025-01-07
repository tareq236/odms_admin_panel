"use client";

import { Footprints } from "lucide-react";
import React from "react";
import Search from "../ui/Search";

export default function Header() {
  return (
    <section className="header flex gap-6 flex-wrap items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="icon rounded-full text-primary">
          <Footprints className="size-5 fill-primary/20" />
        </div>
        <h1 className="text-2xl">Live Tracking</h1>
      </div>

      <Search placeholder="Search by DA code" />
    </section>
  );
}
