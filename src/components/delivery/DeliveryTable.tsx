"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquareOff, Search, ServerOff } from "lucide-react";
import { formatDate } from "@/lib/formatters";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

function DeliveryTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  const searchParams = useSearchParams();


  return (
    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>DA Code</TableHead>
            <TableHead>DA Name</TableHead>
            <TableHead>Billing No.</TableHead>
            <TableHead>Billing Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Vehicle No.</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Gate Pass No.</TableHead>
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
                <TableCell className="min-w-fit">{item.da_name}</TableCell>
                <TableCell>{item.billing_doc_no}</TableCell>
                <TableCell>{formatDate(item.billing_date)}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.vehicle_no}</TableCell>
                <TableCell>{item.partner_name}</TableCell>
                <TableCell>{item.gate_pass_no}</TableCell>
                <TableCell>
                    <Button variant={'link'} className="rounded-full">
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

export default DeliveryTable;
