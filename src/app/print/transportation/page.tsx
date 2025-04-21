import { getDaMovementInfoData } from "@/app/admin/analytics/da-movement-info/_actions/action";
import { getConveyanceData } from "@/app/admin/map/transportation/_action/action";
import CustomBadge from "@/components/badge/TransportationBadge";
import NoData from "@/components/constants/NoData";
import {
  DistanceCell,
  ReverseGeocodeCell,
} from "@/components/conveyance/ConveyanceTable";
import PrintButton from "@/components/print/transportation/PrintButton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formateDateDB, formatNumber, formatTimeTZ } from "@/lib/formatters";
import { distanceConversion, numberToWords, timeConversion } from "@/lib/utils";
import { formatDate } from "date-fns";
import Image from "next/image";
import React from "react";

export default async function TransportationPrintPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const { data } = await getConveyanceData({
    searchParams: searchParams,
  });

  // generate end date from start date
  let endDate: any = searchParams.start.split("-");
  endDate[endDate.length - 1] = Number(endDate[endDate.length - 1]) + 1;
  endDate = endDate.join("-");

  // get da movement info data
  let movementData: any;
  console.log(searchParams.start, formateDateDB(new Date()));

  if (searchParams.start !== formateDateDB(new Date())) {
    const { data: daMovementInfoData } = await getDaMovementInfoData(
      {
        p: "1",
        q: searchParams.q,
        start: searchParams.start,
        end: endDate,
      },
      1
    );

    movementData = daMovementInfoData;
  } else {
    try {
      const response = await fetch(
        `http://128.199.199.164:8000/api/v1/da_movement/analytics/v1?da_code=${searchParams.q}`
      );
      const data = await response.json();

      console.log(data);

      if (!response.ok) throw data;

      movementData = [data.data];
    } catch (error) {
      console.error(error);
    }
  }

  const daData = data as any[];

  const calculateTotalDuration = () => {
    let duration = 0;

    if (!data) return duration;

    (data as any[]).map((item) => {
      if (item.start_journey_date_time && item.end_journey_date_time) {
        duration += item.end_journey_date_time - item.start_journey_date_time;
      }
    });

    return duration;
  };

  const calculateTotalCost = () => {
    let cost = 0;

    if (!data) return cost;

    (data as any[]).map((item) => {
      cost += Number(item.transport_cost ?? 0);
    });

    return cost;
  };

  const calculateTotalDistance = () => {
    let cost = 0;

    if (!data) return cost;

    (data as any[]).map((item) => {
      cost += Number(item?.distance ?? 0);
    });

    return cost;
  };

  return (
    <>
      <PrintButton />
      <table className="w-full [&_td]:p-0">
        {/* page heahder */}
        <thead>
          <tr>
            <th>
              {/* company info */}
              <div className="flex justify-between items-center gap-5">
                {/* company name */}
                <div>
                  <h1 className="h1">Radiant Distributions Limited</h1>
                  <h2 className="text-[9px]">
                    SKS Tower (Level 6, 7, 8), 7 VIP Road, Mohakhali, Dhaka 1206
                  </h2>
                </div>

                {/* logo*/}
                <div className="">
                  <div className="relative w-20 aspect-[16/7]">
                    <Image
                      src={"/logo/rdl.png"}
                      alt="radient distributions logo"
                      fill
                    />
                  </div>
                </div>
              </div>

              {/* bill type */}
              <div className="my-5 text-center flex justify-between items-center gap-5">
                <h3 className="w-fit border px-4 py-2 rounded-sm font-bold">
                  Transportation
                </h3>

                <div className="flex items-center gap-2">
                  <span className="font-bold">Date:</span>
                  <p>
                    {formatDate(
                      new Date(searchParams.start ?? new Date()),
                      "LLL dd, yyyy"
                    )}
                  </p>
                </div>
              </div>

              {/* da info */}
              <article className="grid grid-cols-4 gap-1 mb-3 border-y py-3">
                {daData.length > 0 && (
                  <>
                    <Field fieldName="Name" fieldInput={daData[0].full_name} />
                    <Field fieldName="ID" fieldInput={daData[0].sap_id} />
                    <Field
                      fieldName="Designation"
                      fieldInput={daData[0].user_designation}
                    />
                    <Field
                      fieldName="Name of Depot"
                      fieldInput={daData[0].user_depot}
                    />
                  </>
                )}
              </article>
            </th>
          </tr>
        </thead>

        {/* page content */}
        <tbody>
          <tr>
            <td>
              <Table className="[&_th]:font-bold [&_th]:text-secondary-foreground [&_th]:px-1.5 [&_th]:py-1 [&_th]:h-fit [&_td]:px-1.5 [&_td]:py-0.25 [&_td]:h-fit  [&_td]:border [&_td]:border-black [&_th]:border [&_th]:border-black">
                <TableHeader>
                  <TableRow>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="max-w-16">Distance</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(data as any[]).length > 0
                    ? (data as any[]).map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-nowrap">
                            {formatTimeTZ(
                              item.start_journey_date_time,
                              "h:mm aaa"
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {formatTimeTZ(
                              item.end_journey_date_time as Date,
                              "h:mm aaa"
                            )}
                          </TableCell>

                          <TableCell className="min-w-[5rem]">
                            {item.start_journey_latitude && (
                              <ReverseGeocodeCell
                                lat={item.start_journey_latitude}
                                long={item.start_journey_longitude}
                              />
                            )}
                          </TableCell>
                          <TableCell className="min-w-[5rem]">
                            {item.end_journey_latitude && (
                              <ReverseGeocodeCell
                                lat={item.end_journey_latitude}
                                long={item.end_journey_longitude}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {item.start_journey_date_time &&
                              item.end_journey_date_time &&
                              timeConversion(
                                item.end_journey_date_time -
                                  item.start_journey_date_time
                              )}
                          </TableCell>
                          <TableCell className="max-w-16">
                            {item?.transport_mode && item?.distance + " km"}
                          </TableCell>
                          <TableCell>
                            {item.transport_mode &&
                              JSON.parse(item.transport_mode).map(
                                (title: any, index: number) => (
                                  <div className="my-1" key={index}>
                                    {<div key={index} className="text-xs">{title}</div>}
                                  </div>
                                )
                              )}
                          </TableCell>
                          <TableCell align="right">
                            <span className="flex justify-end">
                              {formatNumber(item.transport_cost)}/-
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}

                  {(data as any[]).length > 0 && (
                    <TableRow className="bg-muted [&_td]:py-2">
                      <TableCell colSpan={3}>
                        In Words: {numberToWords(calculateTotalCost())} taka
                        only
                      </TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>
                        {timeConversion(calculateTotalDuration())}
                      </TableCell>
                      <TableCell>
                        {calculateTotalDistance().toFixed(2)} km
                      </TableCell>
                      <TableCell colSpan={2}>
                        <span className="flex justify-end">
                          {formatNumber(calculateTotalCost())}/-
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* da movement info section */}
              <div className="mt-5">
                <h2 className="font-semibold">DA movement Information</h2>
                <div className="mt-3 grid grid-cols-[0.4fr_1fr] border-y p-1 gap-1">
                  <h3 className="font-semibold">Movement Distance</h3>
                  <p>
                    {formatNumber(
                      (movementData as any)?.[0]?.mv_distance_km.toFixed(2)
                    )}{" "}
                    km
                  </p>
                  <h3 className="font-semibold">Movement Duration</h3>
                  <p>
                    {timeConversion(
                      Number((movementData as any)?.[0]?.mv_time_minutes) *
                        60 *
                        1000
                    )}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        {/* page footer */}
        <tfoot>
          <tr>
            <td>
              {/* signature section */}
              <div className="flex justify-between gap-5 items-center mt-14 mb-10">
                <div className="border-t border-black min-w-[220px] text-center pt-3">
                  <span>Prepared By</span>
                </div>

                <div className="border-t border-black min-w-[220px] text-center pt-3">
                  <span>Supervisor&apos;s Signature</span>
                </div>

                <div className="border-t border-black min-w-[220px] text-center pt-3">
                  <span>Approved by</span>
                </div>
              </div>

              {/* comment section */}
              <div className="print:hidden bottom-0 text-xs">
                This is digitally generated by ODMS Admin panel - Radiant
                Distributions Limited
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

const Field = ({
  fieldName,
  fieldInput,
}: {
  fieldName: string;
  fieldInput: string;
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="min-w-[120px] text-xs">{fieldName}</h4>
      <h5 className="text-sm font-bold">{fieldInput}</h5>
    </div>
  );
};
