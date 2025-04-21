"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import DetailsField from "./DetailsField";
import StatusTag from "./StatusTag";
import { formatDateTimeTZ, formatNumber } from "@/lib/formatters";
import { Badge, CustomBadge } from "../ui/badge";
import RouteMap from "../google-map/RouteMap";
import { useRouter } from "next-nprogress-bar";
import { Map } from "lucide-react";

function TrackDetails({ data }: { data: any[] }) {
  const searchParams = useSearchParams();
  const route = useRouter();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  return (
    <div className="grid lg:grid-cols-[0.25fr_0.75fr] gap-5">
      <section className="py-6 border-r pl-4">
        <ul className="flex flex-col gap-2 border-b pb-5 text-sm">
          {data.map((item, index) => (
            <li
              key={index}
              className={`px-2 py-1 cursor-pointer ${
                searchParams.get("mid") === item.id.toString()
                  ? "border-r-2 bg-blue-50 rounded-l"
                  : ""
              } hover:border-r-2 border-primary hover:bg-blue-50`}
              onClick={() => {
                params.set("mid", item.id.toString());
                route.push(pathname + "?" + params.toString());
              }}
            >
              Journey #{index}
            </li>
          ))}
        </ul>

        {/* details */}
        {data &&
          data
            .filter((map) => {
              return map.id === Number(searchParams.get("mid"));
            })
            .map((details, index) => (
              <section key={index} className="mt-3 md:mt-6">
                <section className="billing-info flex gap-5 text-sm border-b pb-5 flex-wrap">
                  <DetailsField
                    fieldName="DA Code"
                    fieldContent={details.da_code}
                  />
                  <DetailsField
                    fieldName="DA Name"
                    fieldContent={details.full_name}
                  />
                  <DetailsField
                    fieldName="Status"
                    fieldContent={<StatusTag name={details.journey_status} />}
                  />
                </section>

                {/* billing info */}
                <section className="billing-info grid grid-cols-2 gap-5 text-sm py-5 flex-wrap">
                  <DetailsField
                    fieldName="Journey start"
                    fieldContent={formatDateTimeTZ(
                      details.start_journey_date_time
                    )}
                  />
                  <DetailsField
                    fieldName="Journey end"
                    fieldContent={formatDateTimeTZ(
                      details.end_journey_date_time
                    )}
                  />
                  {details && details.transport_mode && (
                    <>
                      <DetailsField
                        fieldName="Transportation"
                        fieldContent={
                          <div className="flex flex-wrap gap-1">
                            {JSON.parse(details.transport_mode).map(
                              (item: any, index: number) => (
                                <div key={index}>
                                  <CustomBadge index={index}>
                                    {item}
                                  </CustomBadge>
                                </div>
                              )
                            )}
                          </div>
                        }
                      />

                      <DetailsField
                        fieldName="Cost"
                        fieldContent={formatNumber(details.transport_cost)}
                      />
                    </>
                  )}
                </section>
              </section>
            ))}
      </section>

      {/* map section */}
      <section>
        {searchParams.has("mid") ? (
          data
            .filter((item) => {
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
            ))
        ) : (
          <>
            <div className="flex flex-col gap-2 justify-center items-center h-full text-muted-foreground/50">
              <Map className="size-10" />
              <p className="text-sm">Please select a journey</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default TrackDetails;
