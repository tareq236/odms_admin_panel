"use client";

import React from "react";
import DatePicker from "../ui/DatePicker";
import Search from "../ui/Search";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FilterSection() {
  const searchParams = useSearchParams();

  return (
    <section className="filter-section flex-wrap">
      <DatePicker />

      <div className="right flex gap-5 flex-wrap">
        <Search placeholder="Search by DA code" />
        {searchParams.has("q") && (
          <Button asChild>
            <Link href={"/print/da-summary" + "?" + searchParams.toString()}>
              <Printer className="size-4 mr-2" />
              Print
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}

export default FilterSection;
