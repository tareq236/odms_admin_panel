"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

function ReturnsTable({
  returnProducts,
  show = false,
  className = "",
  title
}: {
  returnProducts: any[];
  show?: boolean;
  className?: string;
  title: string
}) {
  const [active, setActive] = React.useState(show);

  return (
    <div
      className={cn(
        `${
          active ? "max-h-[500px]" : "max-h-[33px] border-b"
        } overflow-hidden transition-all duration-300`,
        className,
      )}
    >
      <h3
        className="text-sm font-medium flex items-center gap-5 hover:text-primary cursor-pointer transition-all duration-500"
        onClick={() => setActive(!active)}
      >
        {title}
        <ChevronRight
          className={`size-4 ${
            active ? "rotate-90" : ""
          } transition-all duration-300`}
        />
      </h3>
      <Table className="mt-3 [&_td]:p-3 [&_th]:h-fit [&_th]:p-3 [&_tr:last-child]:border-b">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead align="right" className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {returnProducts &&
            returnProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.matnr}</TableCell>
                <TableCell>{item.material_name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReturnsTable;
