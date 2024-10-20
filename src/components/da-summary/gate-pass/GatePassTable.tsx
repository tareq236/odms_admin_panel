"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

function GatePassTable({ className = "" }: { className?: string }) {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className={cn(
        `${active ? "max-h-[500px]" : "max-h-[30px] border-b"} overflow-hidden transition-all duration-300`,
        className,
      )}
    >
      <h3 
        className="font-medium flex items-center gap-5 hover:text-primary cursor-pointer transition-all duration-500"
        onClick={() => setActive(!active)}
      >
        Overview
        <ChevronRight className={`size-4 ${active ? 'rotate-90': ''} transition-all duration-300`} />
      </h3>

      <Table className="mt-3 [&_td]:p-1.5 [&_th]:h-fit [&_th]:p-1.5 [&_tr:last-child]:border-b">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead># Invoice</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{formatNumber(27)}</TableCell>
            <TableCell>{formatNumber(58822.0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delivered</TableCell>
            <TableCell>{formatNumber(4)}</TableCell>
            <TableCell>{formatNumber(1901.51002)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delivery Remaining</TableCell>
            <TableCell>{formatNumber(23)}</TableCell>
            <TableCell>{formatNumber(58822.0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cash Collection</TableCell>
            <TableCell>{formatNumber(0)}</TableCell>
            <TableCell>{formatNumber(0.0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Collection Remaining</TableCell>
            <TableCell>{formatNumber(4)}</TableCell>
            <TableCell>{formatNumber(1901.510002)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Return</TableCell>
            <TableCell>{formatNumber(4)}</TableCell>
            <TableCell>{formatNumber(3162.49)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Due</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{formatNumber(1901.51)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default GatePassTable;
