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
import { formatDate } from "@/lib/formatters";
import { ScrollText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RequestlistDetails } from "@/types/request-list";
import StatusBadge from "../../StatusBadge";
import RequestInvoiceDetails from "./RequestInvoiceDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import AssignDaForm from "./AssignDaForm";

export default function RequestListTable({
  data,
  error,
}: {
  data: RequestlistDetails[];
  error?: string;
}) {
  const [view, setView] = useState<any>(false);

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
            <TableHead>Invoice No.</TableHead>
            <TableHead>Invoice Type</TableHead>
            <TableHead>Depot</TableHead>
            <TableHead>Partner Name</TableHead>
            <TableHead>Customer Address</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Assign DA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.invoice_no}</TableCell>
                <TableCell>{item.invoice_type}</TableCell>
                <TableCell>{item.depot_name || `-`}</TableCell>
                <TableCell>{item.partner_name || `-`}</TableCell>
                <TableCell>{item.customer_address || `-`}</TableCell>
                <TableCell>{item.route_name || `-`}</TableCell>
                <TableCell>
                  {item.da_name ? (
                    item.da_name
                  ) : (
                    <AssignDaForm invoiceNo={item.invoice_no} depotCode={item.depot_id} />
                  )}
                </TableCell>
                <TableCell className="min-w-[120px]">
                  <StatusBadge status={item.last_status} />
                </TableCell>
                <TableCell>
                  {item.request_date
                    ? formatDate(new Date(item.request_date))
                    : "-"}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    className="text-primary"
                    variant={"ghost"}
                    onClick={() => setView(item)}
                  >
                    View
                  </Button>
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
