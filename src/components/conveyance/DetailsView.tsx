import { cn } from "@/lib/utils";
import React from "react";
import StatusTag from "./StatusTag";
import { MapPin } from "lucide-react";
import GoogleMap from "../google-map/GoogleMap";
import { formatDateTime, formatNumber } from "@/lib/formatters";

export default function DetailsView({ details }: { details: any }) {
  return (
    <article>
      <section className="billing-info flex gap-5 text-sm border-b pb-5 flex-wrap">
        <DetailsField fieldName="DA Code" fieldContent={details.da_code} />
        <DetailsField fieldName="DA Name" fieldContent={details.full_name} />
        <DetailsField
          fieldName="Status"
          fieldContent={<StatusTag name={details.journey_status} />}
        />
      </section>

      <section className="billing-info grid grid-cols-2 md:grid-cols-4 gap-5 text-sm border-b py-5 flex-wrap">
        <DetailsField
          fieldName="Journey start"
          fieldContent={formatDateTime(details.start_journey_date_time)}
        />
        <DetailsField
          fieldName="Journey end"
          fieldContent={formatDateTime(details.end_journey_date_time)}
        />
        <DetailsField
          fieldName="Transportation"
          fieldContent={
            <>
              {details &&
                JSON.parse(details.transport_mode).map(
                  (item: any, index: number) => (
                    <div className="" key={index}>
                      {item}
                    </div>
                  ),
                )}
            </>
          }
        />
        <DetailsField
          fieldName="Cost"
          fieldContent={formatNumber(details.transport_cost)}
        />
      </section>

      <section className="flex flex-col gap-3 py-5">
        <h5 className="text-muted-foreground flex items-center text-sm">
          <MapPin className="size-4 mr-2 text-primary" />
          <span>Location</span>
        </h5>
        <section className="w-full rounded overflow-hidden border border-primary p-0.25">
          <GoogleMap
            defaultZoom={13}
            latitude={Number(details.start_journey_latitude || 23.81)}
            longitude={Number(details.start_journey_longitude || 90.41)}
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
      <h3 className="text-[12px] text-gray-500 mb-2">{fieldName}</h3>
      <h4>{fieldContent}</h4>
    </div>
  );
};
