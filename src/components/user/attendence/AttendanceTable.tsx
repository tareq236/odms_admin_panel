import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { MessageSquareOff, ServerOff } from "lucide-react";
import React from "react";
import { formatDateTime, formatNumber } from "@/lib/formatters";

export default function AttendanceTable({
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
            <TableHead>SAP ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Start from</TableHead>
            <TableHead>End at</TableHead>
            <TableHead>Late time (min)</TableHead>
            <TableHead>Overtime (min)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {connectionError ? (
            <TableRow>
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
            data.map((item) => (
              <TableRow key={item.sap_id}>
                <TableCell>{item.sap_id}</TableCell>
                <TableCell>{item.full_name}</TableCell>
                <TableCell className="min-w-[180px]">{item.start_date_time ? formatDateTime(item.start_date_time) : '-'}</TableCell>
                <TableCell className="min-w-[180px]">{item.end_date_time ? formatDateTime(item.end_date_time) : '-'}</TableCell>
                <TableCell >{item.late_time_min ? formatNumber(item.late_time_min): '-'}</TableCell>
                <TableCell>{item.over_time_min ? formatNumber(item.over_time_min): '-'}</TableCell>
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
