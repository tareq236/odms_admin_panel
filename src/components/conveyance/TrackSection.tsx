"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Compass, Waypoints } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import RouteMap from "../google-map/RouteMap";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { number } from "zod";

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
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="md:min-w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Waypoints className="size-4 text-primary" />
              <span>Conveyance Details</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-[0.2fr_0.8fr] gap-5">
            <section>
              <ul className="flex flex-col gap-5">
                {data.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      params.set("mid", item.id.toString());
                      route.push(pathname + "?" + params.toString());
                    }}
                  >
                    Journey #{index}
                  </li>
                ))}
              </ul>
            </section>

            <section className="">
              {searchParams.has("mid") &&
                data
                  .filter((item) => {
                    console.log(item.id == Number(searchParams.get("mid")))
                    return item.id == Number(searchParams.get("mid"));
                  })
                  .map((value) => (
                    <RouteMap
                      key={value.id}
                      startLat={Number(value.start_journey_latitude)}
                      startLng={Number(value.start_journey_longitude)}
                      endLat={Number(value.end_journey_latitude)}
                      endLng={Number(value.end_journey_longitude)}
                    />
                  ))}
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TrackSection;
