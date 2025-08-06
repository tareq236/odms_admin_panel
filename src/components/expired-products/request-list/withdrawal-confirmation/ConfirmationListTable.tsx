"use client";

import { Button } from "@/components/ui/button";
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
import { WithdrawalConfirmation } from "@/types/request-list";
import StatusBadge from "../../StatusBadge";
import { Modal } from "@/components/modal/Modal";

export default function ConfirmationListTable({
  data,
  error,
}: {
  data: WithdrawalConfirmation[];
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
            <TableHead>ID</TableHead>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Invoice Type</TableHead>
            <TableHead>Depot</TableHead>
            <TableHead>Partner Name</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data && data?.length > 0 &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.invoice_no}</TableCell>
                <TableCell>{item.invoice_type}</TableCell>
                <TableCell>{item.depot_id || `-`}</TableCell>
                <TableCell>{item.partner_id || `-`}</TableCell>
                <TableCell>{item.route_id || `-`}</TableCell>
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
      <Modal
        open={!!view}
        header={{ icon: ScrollText, title: "Withdrawal Confirmed Product" }}
        onOpenChange={setView}
      >
        No Data
      </Modal>
    </>
  );
}
