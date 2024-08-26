"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import Search from "./Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <nav className="sticky top-0 bg-white w-full border-b">
      
      {/* navbar */}
      <div className="flex justify-between items-center gap-5 px-5 py-6 shadow-sm h-14">
        <div className="left flex gap-5 items-center">
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

          <Separator className="h-8 md:hidden" orientation="vertical" />

          <Search />
        </div>

        <div className="right">
          {/* user */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* sidebar */}
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side={"left"}>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
