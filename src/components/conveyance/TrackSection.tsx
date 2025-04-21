"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Compass, Waypoints } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TrackDetails from "./TrackDetails";
import { ScrollArea } from "../ui/scroll-area";

function TrackSection({ data }: { data: any[] }) {
  const [view, setView] = useState(false);

  const searchParams = useSearchParams();
  const route = useRouter();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  return (
    <>
      <Button
        onClick={() => {
          setView(true);
        }}
      >
        <Compass className="size-4 mr-2" />
        <span>Track All</span>
      </Button>

      {/* dialog */}
      <Dialog
        open={view}
        onOpenChange={() => {
          params.delete("mid");
          setView(false);
          route.push(pathname + "?" + params.toString());
        }}
      >
        <DialogContent className="md:min-w-[90vw] md:max-w-xl">
          <ScrollArea className="h-[75vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Waypoints className="size-4 text-primary" />
                <span>Conveyance Details</span>
              </DialogTitle>
            </DialogHeader>

            <TrackDetails data={data} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TrackSection;
