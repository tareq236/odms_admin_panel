"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import DetailsField from "./DetailsField";
import StatusTag from "./StatusTag";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import { Badge } from "../ui/badge";
import RouteMap from "../google-map/RouteMap";
import { useRouter } from "next-nprogress-bar";

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
            .map((details) => (
              <section className="mt-3 md:mt-6">
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

                <section className="billing-info grid grid-cols-2 gap-5 text-sm py-5 flex-wrap">
                  <DetailsField
                    fieldName="Journey start"
                    fieldContent={formatDateTime(
                      details.start_journey_date_time,
                    )}
                  />
                  <DetailsField
                    fieldName="Journey end"
                    fieldContent={formatDateTime(details.end_journey_date_time)}
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
                                  <Badge
                                    className={`min-w-fit hover:bg-inital ${
                                      index % 5 === 0
                                        ? "bg-yellow-400 text-yellow-900"
                                        : index % 4 === 0
                                        ? "bg-teal-600"
                                        : index % 3 === 0
                                        ? "bg-rose-600 text-rose-50"
                                        : index % 2 === 0
                                        ? "bg-fuchsia-200 text-fuchsia-900"
                                        : ""
                                    }`}
                                  >
                                    {item}
                                  </Badge>
                                </div>
                              ),
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

      <section className="">
        {searchParams.has("mid") &&
          data
            .filter((item) => {
              console.log(item.id == Number(searchParams.get("mid")));
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
  );
}

export default TrackDetails;
