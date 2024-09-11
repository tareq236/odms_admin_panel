"use client";

import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

function Accordion({
  icon,
  name,
  children,
}: {
  icon: React.ReactNode;
  name: string;
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);
  const pathname = usePathname()

  return (
    <div className="w-full">
      <Button
        variant={"ghost"}
        className={`text-sm font-normal w-full flex justify-between items-center
           p-2 rounded hover:bg-primary/10 hover:text-primary ${pathname.includes(name.toLowerCase()) ? 'text-primary bg-primary/5' : ''}
           transition-all duration-300`}
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        <span className="flex gap-3 items-center">
          {icon}
          <span>{name}</span>
        </span>
        <ChevronRight
          className={`size-4 ${
            showContent ? "rotate-90" : ""
          } transition-transform duration-300`}
        />
      </Button>
      <div
        className={`pl-5 transition-all duration-300 ${
          showContent ? "max-h-[10rem]" : "max-h-0 pointer-events-none"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
