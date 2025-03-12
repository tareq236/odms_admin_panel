import { getConveyanceData } from "@/app/admin/map/transportation/_action/action";
import CustomBadge from "@/components/badge/TransportationBadge";
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
import { formatNumber, formatTimeTZ } from "@/lib/formatters";
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
                  <p>{formatDate(new Date(searchParams.start ?? new Date()), 'LLL dd, yyyy')}</p>
                </div>
              </div>

              {/* da info */}
              <article className="grid grid-cols-2 gap-1 mb-3 border-y py-3">
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
                            {item.start_journey_latitude &&
                              item.end_journey_latitude && (
                                <DistanceCell
                                  origin={`${item.start_journey_latitude},${item.start_journey_longitude}`}
                                  destination={`${item.end_journey_latitude},${item.end_journey_longitude}`}
                                />
                              )}
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
                          <TableCell>
                            {formatNumber(item.transport_cost)}
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
                      <TableCell colSpan={2}></TableCell>
                      <TableCell>
                        {formatNumber(calculateTotalCost())}
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
              <div className="flex justify-between gap-5 items-center mt-14 mb-10">
                <div className="border-t border-black min-w-[220px] text-center pt-3">
                  <span>Supervisor&apos;s Signature</span>
                </div>

                <div className="border-t border-black min-w-[220px] text-center pt-3">
                  <span>Approved by</span>
                </div>
              </div>

              <div className="fixed bottom-0 text-xs">This is digitally generated by ODMS Admin panel - Radiant Distributions Limited</div>
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
