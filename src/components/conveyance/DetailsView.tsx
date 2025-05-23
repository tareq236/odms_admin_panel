import React from "react";
import StatusTag from "./StatusTag";
import { MapPin } from "lucide-react";
import { formatDateTimeTZ, formatNumber } from "@/lib/formatters";
import RouteMap from "../google-map/RouteMap";
import { Badge } from "../ui/badge";
import DetailsField from "./DetailsField";
import CustomBadge from "../badge/TransportationBadge";

export default function DetailsView({ details }: { details: any }) {
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
            endLat={Number(details?.end_journey_latitude)}
            endLng={Number(details?.end_journey_longitude)}
          />
        </section>
      </section>
    </article>
  );
}
