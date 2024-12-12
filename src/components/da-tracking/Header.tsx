import { MapPin } from "lucide-react";
import React from "react";
import Search from "../ui/Search";

export default function Header() {
  return (
    <section className="header flex gap-2 justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <div className="icon rounded-full text-primary">
          <MapPin className="size-5 fill-primary/20" />
        </div>
        <h1 className="text-2xl">DA Tracking</h1>
      </div>
      <Search placeholder="Search by DA code" />
    </section>
  );
}
