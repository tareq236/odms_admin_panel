"use client";

import React, { useEffect, useState } from "react";
import StatusTag from "./StatusTag";
import { MapPin } from "lucide-react";
import {
  formatDateTimeTZ,
  formateDateDB,
  formatNumber,
} from "@/lib/formatters";
import RouteMap from "../google-map/RouteMap";
import DetailsField from "./DetailsField";
import CustomBadge from "../badge/TransportationBadge";
import { ReverseGeocodeCell } from "./ConveyanceTable";
import { useSearchParams } from "next/navigation";
import { timeConversion } from "@/lib/utils";
import { toast } from "sonner";

export default function DetailsView({ details }: { details: any }) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const searchParams = useSearchParams();

  const modifiedStartTime = details.start_journey_date_time
    ? JSON.stringify(details.start_journey_date_time).split("T")[1].slice(0, 11)
    : "";
  const modifiedEndTime = details.end_journey_date_time
    ? JSON.stringify(details.end_journey_date_time).split("T")[1].slice(0, 11)
    : "";

  useEffect(() => {
    fetch(
      `/api/map/transportation?q=${searchParams.get("q")}&start=${
        searchParams.has("start")
          ? searchParams.get("start")
          : formateDateDB(new Date())
      }&start_time=${modifiedStartTime}&end_time=${modifiedEndTime}`
    ) // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [details, loading]);

  useEffect(() => {
    if (error) {
      toast.error(error.error);
    }
  }, [error]);

  return (
    <article className="grid grid-cols-1 md:grid-cols-[0.35fr_0.65fr] gap-5">
      <section className="mt-3 md:mt-6">
        <section className="billing-info flex gap-5 text-sm border-b pb-5 flex-wrap">
          <DetailsField fieldName="DA Code" fieldContent={details.da_code} />
          <DetailsField fieldName="DA Name" fieldContent={details.full_name} />
          <DetailsField
            fieldName="Status"
            fieldContent={<StatusTag name={details.journey_status} />}
          />
        </section>

        <section className="billing-info grid grid-cols-2 gap-5 text-sm border-b py-5 flex-wrap">
          {data && (data as any[]).length > 0 && (
            <>
              <DetailsField
                fieldName="Start Location"
                fieldContent={
                  <ReverseGeocodeCell
                    lat={data[0].latitude}
                    long={data[0].longitude}
                  />
                }
              />

              <DetailsField
                fieldName="End Locaion"
                fieldContent={
                  <ReverseGeocodeCell
                    lat={data[data.length - 1].latitude}
                    long={data[data.length - 1].longitude}
                  />
                }
              />
            </>
          )}

          <DetailsField
            fieldName="Journey start"
            fieldContent={formatDateTimeTZ(details.start_journey_date_time)}
          />
          <DetailsField
            fieldName="Journey end"
            fieldContent={formatDateTimeTZ(details.end_journey_date_time)}
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
                          <CustomBadge index={index} title={item} />
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

              <DetailsField
                fieldName="Distance"
                fieldContent={formatNumber(details.distance) + " km"}
              />

              {details.start_journey_date_time &&
                details.end_journey_date_time && (
                  <DetailsField
                    fieldName="Duration"
                    fieldContent={timeConversion(
                      details.end_journey_date_time -
                        details.start_journey_date_time
                    )}
                  />
                )}
            </>
          )}
        </section>
      </section>

      {/* maps */}
      <section className="flex flex-col gap-3 py-5">
        <h5 className="text-muted-foreground flex items-center text-sm">
          <MapPin className="size-4 mr-2 text-primary" />
          <span>Location</span>
        </h5>
        <section className="w-full rounded overflow-hidden border border-primary p-0.25">
          <RouteMap
            startLat={Number(details.start_journey_latitude || 23.81)}
            startLng={Number(details.start_journey_longitude || 90.41)}
            data={data as any[]}
            loading={loading}
          />
        </section>
      </section>
    </article>
  );
}
