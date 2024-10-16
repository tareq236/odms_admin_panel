"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TabSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const tabList = [
    {
      id: 1,
      name: "Profile & Attendance",
      link: "/admin/da-summary",
    },
    // {
    //   id: 2,
    //   name: "Attendance",
    //   link: "/admin/da-summary/attendance",
    // },
    {
      id: 3,
      name: "Delivery",
      link: "/admin/da-summary/delivery",
    },
    {
      id: 4,
      name: "Conveyance",
      link: "/admin/da-summary/conveyance",
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 border-b">
        {tabList.map((item) => (
          <Button
            key={item.id}
            asChild
            variant={"ghost"}
            className={`${
              pathname === item.link
                ? "border-b-2 border-primary rounded-b-none"
                : ""} transition-all duration-300`
            }
          >
            <Link href={item.link + '?' + searchParams.toString()}>{item.name}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
