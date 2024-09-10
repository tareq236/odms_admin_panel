"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquareOff, Package, Search, ServerOff } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/formatters";

import { useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import StatusTag from "./StatusTag";

function DeliveryCollectionTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  const searchParams = useSearchParams();
  const [view, setView] = useState<any>(false)


  return (


    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>Billing No.</TableHead>
            <TableHead>Billing Date</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Collection Status</TableHead>
            <TableHead>Collection</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Net Value</TableHead>
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
                <TableCell>{item.billing_doc_no}</TableCell>
                <TableCell>{formatDate(item.billing_date)}</TableCell>
                <TableCell><StatusTag status={item.delivery_status || ''} /></TableCell>
                <TableCell><StatusTag status={item.cash_collection_status || ''} /></TableCell>
                <TableCell>{formatNumber(item.cash_collection)}</TableCell>
                <TableCell>{formatNumber(item.due_amount)}</TableCell>
                <TableCell>{formatNumber(item.net_val)}</TableCell>
                <TableCell>
                    <Button variant={'link'} className="rounded-full" onClick={() => setView(item)}>
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


      {/* delivery details modal */}
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="md:w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="size-4 text-primary" />
              <span>Delivery Details</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          {/* <DeliveryDetailsView details={view}/> */}
        </DialogContent>
      </Dialog>

    </>
  );
}

export default DeliveryCollectionTable;
