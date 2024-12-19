import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MessageSquareOff, ServerOff } from "lucide-react";
import { formatDate } from "@/lib/formatters";

export default function DaMovementInfoTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DA Code</TableHead>
            <TableHead>DA Name</TableHead>
            <TableHead>Movement Distance (km)</TableHead>
            <TableHead>Movement Time (minutes)</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {connectionError ? (
            <TableRow>
              <TableCell
                colSpan={70}
                align="center"
                className="py-20 text-gray-400 pointer-events-none"
              >
                <ServerOff className="size-10" />
                <span className="text-[11px]">Database Discounted</span>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.da_code}>
                <TableCell>{item.da_code}</TableCell>
                <TableCell>{item.full_name}</TableCell>
                <TableCell>{item.mv_distance_km}</TableCell>
                <TableCell>{item.mv_time_minutes}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={70}
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
