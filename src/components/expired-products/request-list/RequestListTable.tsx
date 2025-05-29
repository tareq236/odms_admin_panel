"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tooltips from "@/components/ui/Tooltips";
import { formatDate } from "@/lib/formatters";
import { Eye, ScrollText, Trash, UserPen } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { RequestlistDetails } from "@/types/request-list";
import StatusBadge from "../StatusBadge";
import RequestInvoiceDetails from "./RequestInvoiceDetails";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function RequestListTable({
  data,
  error,
}: {
  data: RequestlistDetails[];
  error?: string;
}) {
  const [view, setView] = useState<any>(false);
  const [delUser, setDelUser] = useState<any>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Invoice Type</TableHead>
            <TableHead>Depot</TableHead>
            <TableHead>Partner Name</TableHead>
            <TableHead>Customer Address</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.invoice_no}</TableCell>
                <TableCell>{item.invoice_type}</TableCell>
                <TableCell>{item.depot_name || `-`}</TableCell>
                <TableCell>{item.partner_name || `-`}</TableCell>
                <TableCell>{item.customer_address || `-`}</TableCell>
                <TableCell>{item.route_name || `-`}</TableCell>
                <TableCell className="min-w-[120px]">
                  <StatusBadge status={item.last_status} />
                </TableCell>
                <TableCell>
                  {item.request_date
                    ? formatDate(new Date(item.request_date))
                    : "-"}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Tooltips title="View">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                      onClick={() => setView(item)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      className="rounded-full size-8"
                      onClick={() => setDelUser(item.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Tooltips>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* edit user dialog */}
      <Dialog open={!!view} onOpenChange={setView}>
        <DialogContent className="md:w-[90vw] md:max-w-5xl w-full p-0">
          <ScrollArea className="max-h-[85vh] p-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="flex items-center gap-2">
                <ScrollText className="size-4 text-primary" />
                <span>Request Product Details</span>
              </DialogTitle>
            </DialogHeader>
            {view && <RequestInvoiceDetails data={view} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
