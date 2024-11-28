"use client";

import ProgressPercentage from "@/components/Progress/ProgressPercentage";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquareOff, ServerOff } from "lucide-react";
import React from "react";
import SortableTableHeader from "./SortableTableHead";


export default function PartnerDeliveryStatsTable({
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
            <SortableTableHeader sortingValue="rec">
              Delivery Received (%)
            </SortableTableHeader>
            <SortableTableHeader sortingValue="ret">
              Delivery Returned (%)
            </SortableTableHeader>
            <SortableTableHeader sortingValue="full">
              Full Payment (%)
            </SortableTableHeader>
            <SortableTableHeader sortingValue="due">
              Due (%)
            </SortableTableHeader>
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
