import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { MessageSquareOff, ServerOff } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/formatters";

import { format } from "date-fns";
import { DeliveryTableProps } from "@/lib/definitions";

function DeliveryTable({
    data,
    connectionError
}: {data: DeliveryTableProps[], connectionError: boolean}) {


  return (
    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>SAP ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Billing No.</TableHead>
            <TableHead>Billing Date</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Vehicle No.</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Gate Pass No.</TableHead>
            <TableHead>Total Count</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Total TP</TableHead>
            <TableHead>Total VAT</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {connectionError ? (
            <TableRow className="table-row-nowrap">
              <TableCell
                colSpan={6}
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
                <TableCell className="min-w-fit">{item.sap_id}</TableCell>
                <TableCell className="min-w-fit">{item.full_name}</TableCell>
                <TableCell>{item.billing_doc_no}</TableCell>
                <TableCell>{formatDate(item.billing_date)}</TableCell>
                <TableCell>{item.route}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.vehicle_no}</TableCell>
                <TableCell>{item.partner}</TableCell>
                <TableCell>{item.gate_pass_no}</TableCell>
                <TableCell>{Number(item.total_count)}</TableCell>
                <TableCell>{formatNumber(item.total_quantity)}</TableCell>
                <TableCell>{formatNumber(item.total_net_val)}</TableCell>
                <TableCell>{formatNumber(item.total_tp)}</TableCell>
                <TableCell>{formatNumber(item.total_vat)}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={6}
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
