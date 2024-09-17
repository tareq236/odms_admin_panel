"use client";

import CircularProgress from "@/components/Progress/CircularProgress/CircularProgress";
import ProgressPercentage from "@/components/Progress/ProgressPercentage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/formatters";
import { MessageSquareOff, ServerOff } from "lucide-react";
import React from "react";

function PartnerDeliveryStatsTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  return (
    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Partner Name</TableHead>
            <TableHead>Delivery Received (%)</TableHead>
            <TableHead>Delivery Returned (%)</TableHead>
            <TableHead>Full Payment (%)</TableHead>
            <TableHead>Due (%)</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {connectionError ? (
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
                <TableCell>{item.partner_id}</TableCell>
                <TableCell>{item.name1}</TableCell>
                <TableCell>
                  <ProgressPercentage value={item.total_received_percentage} />
                </TableCell>
                <TableCell>
                  <ProgressPercentage value={item.total_return_percentage} />
                </TableCell>
                <TableCell>
                  <ProgressPercentage value={item.full_payment_percentage} />
                </TableCell>
                <TableCell>
                  <ProgressPercentage value={item.due_percentage} />
                </TableCell>
                {/* <TableCell>
                  <Button
                    variant={"link"}
                    className="rounded-full"
                    onClick={() => {}}
                  >
                    Details
                  </Button>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            // for no data
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
    </>
  );
}

export default PartnerDeliveryStatsTable;
