"use client";

import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { useSearchParams } from "next/navigation";
import { MessageSquareOff, Search, ServerOff, Waypoints } from "lucide-react";
import { Button } from "../ui/button";
import { formatDateTimeTZ, formatDateTZ, formatNumber } from "@/lib/formatters";
import StatusTag from "./StatusTag";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DetailsView from "./DetailsView";

function ConveyanceTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  const [view, setView] = useState<any>(false);
  const searchParams = useSearchParams();

  return (
    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>DA Code</TableHead>
            <TableHead>DA Name</TableHead>
            <TableHead>Journey Start</TableHead>
            <TableHead>Journey End</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Journey Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!searchParams.has("q") ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  className="py-20 text-gray-400 pointer-events-none"
                >
                  <Search className="size-10" />
                  <span className="text-[11px]">Search by DA Code</span>
                </TableCell>
              </TableRow>
            </>
          ) : connectionError ? (
            <TableRow className="table-row-nowrap">
              <TableCell
                colSpan={8}
                align="center"
                className="py-20 text-gray-400 pointer-events-none"
              >
                <ServerOff className="size-10" />
                <span className="text-[11px]">Database Discounted</span>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="min-w-fit">{item.da_code}</TableCell>
                <TableCell className="min-w-fit">{item.full_name}</TableCell>
                <TableCell>{formatDateTimeTZ(item.start_journey_date_time)}</TableCell>
                <TableCell>{formatDateTimeTZ(item.end_journey_date_time as Date)}</TableCell>
                <TableCell>{formatNumber(item.transport_cost)}</TableCell>
                <TableCell><StatusTag name={item.journey_status} /></TableCell>
                <TableCell>{formatDateTZ(item.created_at as Date)}</TableCell>
                <TableCell>
                  <Button
                    variant={"link"}
                    className="rounded-full"
                    onClick={() => setView(item)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  className="py-20 text-gray-400 pointer-events-none"
                >
                  <MessageSquareOff className="size-10" />
                  <span className="text-[11px]">No data</span>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>


      {/* delivery details modal */}
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="md:min-w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Waypoints className="size-4 text-primary" />
              <span>Conveyance Details</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          <DetailsView details={view} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ConveyanceTable;
