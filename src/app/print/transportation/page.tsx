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
import { numberToWords, timeConversion } from "@/lib/utils";
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
  console.log(searchParams.start, formateDateDB(new Date()))

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

      console.log(data)

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
                  Conveyance bill
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
              <article className="grid grid-cols-2 gap-1 mb-3 border-y py-3">
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
              <Table className="[&_th]:font-bold [&_th]:text-secondary-foreground [&_td]:px-1.5  [&_td]:border [&_td]:border-black [&_th]:border [&_th]:border-black">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-nowrap">#</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(data as any[]).length > 0
                    ? (data as any[]).map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>#{index + 1}</TableCell>
                          <TableCell>
                            {formatTimeTZ(item.start_journey_date_time)}
                          </TableCell>
                          <TableCell>
                            {formatTimeTZ(item.end_journey_date_time as Date)}
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
                          <TableCell>
                            {formatNumber(item?.distance) + " m" || "-"}
                          </TableCell>
                          <TableCell>
                            {item.transport_mode &&
                              JSON.parse(item.transport_mode).map(
                                (title: any, index: number) => (
                                  <div key={index}>
                                    {
                                      <CustomBadge
                                        index={index}
                                        title={title}
                                      />
                                    }
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
                </TableBody>

                {(data as any[]).length > 0 && (
                  <TableFooter className="[&>td]:font-bold [&_td]:p-2">
                    <TableRow>
                      <TableCell colSpan={4}>
                        In Words: {numberToWords(calculateTotalCost())} taka
                        only
                      </TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell colSpan={1}>
                        {timeConversion(calculateTotalDuration())}
                      </TableCell>
                      <TableCell colSpan={2}>
                        {formatNumber(calculateTotalDistance())} m
                      </TableCell>
                      <TableCell>
                        <span className="flex justify-end">
                          {formatNumber(calculateTotalCost())}/-
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </td>
          </tr>
        </tbody>

        {/* page footer */}
        <tfoot>
          <tr>
            <td>
              {/* da movement info section */}
              <div className="mt-5">
                <h2 className="font-semibold">DA movement Information</h2>
                <div className="mt-3 grid grid-cols-[0.4fr_1fr] border-y p-1 gap-1">
                  <h3 className="font-semibold">Movement Distance (km)</h3>
                  <p>{formatNumber((movementData as any)?.[0]?.mv_distance_km.toFixed(2))}</p>
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
              <div className="fixed bottom-0 text-xs">
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
    <div className="flex">
      <h4 className="min-w-[120px] font-bold">{fieldName}</h4>
      <h5>{fieldInput}</h5>
    </div>
  );
};
