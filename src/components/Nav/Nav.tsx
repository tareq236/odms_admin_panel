"use client";

import { Button } from "@/components/ui/button";
import { Map, Menu } from "lucide-react";
import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "../sidenav/Sidebar";
import Link from "next/link";

export default function Nav({ user }: { user: any }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <nav className="sticky top-0 bg-white w-full border-b z-10 md:hidden">
      {/* navbar */}
      <div className="flex justify-between items-center gap-5 px-5 py-6 shadow-sm h-14">
        <div className="left flex gap-2 items-center">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full md:hidden text-gray-500"
            onClick={() => {
              setShowSidebar(true);
            }}
          >
            <Menu className="size-6" />
          </Button>

          <Link
            href={"/"}
            className="logo text-primary md:py-0 flex items-center gap-2"
          >
            <Map className="size-5" />
            <div className="">
              <h1 className="font-title tracking-[1rem] text-sm">ODMS</h1>
              <h2 className="text-[9px] -mt-1 text-muted-foreground">
                Radient Distributions
              </h2>
            </div>
          </Link>
        </div>
      </div>

      {/* sidebar */}
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side={"left"} className="p-0">
          <Sidebar
            userRole={user.role}
            onClose={() => {
              setShowSidebar(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
