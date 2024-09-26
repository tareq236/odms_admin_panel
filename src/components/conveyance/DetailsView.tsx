import { cn } from "@/lib/utils";
import React from "react";
import StatusTag from "./StatusTag";
import { MapPin } from "lucide-react";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import RouteMap from "../google-map/RouteMap";
import { Badge } from "../ui/badge";

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
            fieldContent={formatDateTime(details.start_journey_date_time)}
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
                            className={`hover:bg-inital ${
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

const DetailsField = ({
  className,
  fieldName,
  fieldContent,
}: {
  className?: string;
  fieldName: string;
  fieldContent: string | React.ReactNode;
}) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-[12px] text-gray-500 mb-1">{fieldName}</h3>
      <h4>{fieldContent}</h4>
    </div>
  );
};
