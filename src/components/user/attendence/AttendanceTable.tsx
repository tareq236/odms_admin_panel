"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Edit, MessageSquareOff, ServerOff, Trash } from "lucide-react";
import React from "react";
import UserStatusTag from "../UserStatusTag";
import Tooltips from "@/components/ui/Tooltips";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/lib/formatters";
import { AttendanceTableProps } from "@/app/admin/user/attendance/page";
import { format } from "date-fns";

export default function AttendanceTable({
    data,
    connectionError,
  }: {
    data: AttendanceTableProps[];
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
                colSpan={7}
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
                <TableCell>{item.rdl_user_list?.full_name}</TableCell>
                <TableCell>{item.start_date_time ? format(item.start_date_time,'yyyy-MM-dd | h:mm aaaa') : '-'}</TableCell>
                <TableCell>{item.end_date_time ? format(item.end_date_time,'yyyy-MM-dd | h:mm aaaa') : '-'}</TableCell>
                <TableCell>{item.late_time_min ? formatNumber(item.late_time_min): '-'}</TableCell>
                <TableCell>{item.over_time_min ? formatNumber(item.over_time_min): '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={7}
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
