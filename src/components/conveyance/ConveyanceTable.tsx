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
import { MessageSquareOff, Search, ServerOff } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate, formatDateTime } from "@/lib/formatters";
import { rdl_conveyance } from "@prisma/client";
import StatusTag from "./StatusTag";

function ConveyanceTable({
  data,
  connectionError,
}: {
  data: rdl_conveyance[];
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
                <TableCell className="min-w-fit">{item.da_code}</TableCell>
                <TableCell>{formatDateTime(item.start_journey_date_time)}</TableCell>
                <TableCell>{formatDateTime(item.end_journey_date_time as Date)}</TableCell>
                <TableCell><StatusTag name={item.journey_status} /></TableCell>
                <TableCell>{formatDate(item.created_at as Date)}</TableCell>
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
    </>
  );
}

export default ConveyanceTable;
