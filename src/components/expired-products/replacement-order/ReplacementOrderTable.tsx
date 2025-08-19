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
import { List, ScrollText } from "lucide-react";
import React, { useState } from "react";
// import StatusBadge from "../../StatusBadge";
import { Modal } from "@/components/modal/Modal";
import { ReplacementOrderWithMatnr } from "@/types/replacement-order";
import { Badge } from "@/components/ui/badge";
import { updateAssignDA } from "@/app/admin/expired-products/_actions/replacement-order";
import AssignDaForm from "../AssignDaForm";
import OrderDetails from "./OrderDetails";

export default function ReplacementOrderTable({
  data,
}: {
  data: ReplacementOrderWithMatnr[];
}) {
  const [view, setView] = useState<any>(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Depot</TableHead>
            <TableHead>Partner Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Delivery DA ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Approval</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data &&
            data?.length > 0 &&
            data.map((item) => (
              <TableRow key={item.invoice_no}>
                <TableCell>
                  <Button
                    className="text-primary px-0"
                    variant={"ghost"}
                    onClick={() => setView(item)}
                  >
                    {item.invoice_no}
                  </Button>
                </TableCell>
                <TableCell>{item.depot_id || `-`}</TableCell>
                <TableCell>{item.partner_name || `-`}</TableCell>
                <TableCell>{item.partner_address || `-`}</TableCell>
                <TableCell>
                  {item.delivery_da_id ? (
                    item.delivery_da_id
                  ) : (
                    <AssignDaForm
                      invoiceNo={item.invoice_no}
                      depotCode={item.depot_id}
                      onAssignDA={updateAssignDA}
                    />
                  )}
                </TableCell>
                <TableCell className="min-w-[120px]">
                  <Badge variant={"outline"}>{item.last_status}</Badge>
                </TableCell>
                <TableCell>
                  {item.order_approval_date
                    ? formatDate(new Date(item.order_approval_date))
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
        header={{ icon: List, title: "Replacement Order Details" }}
        onOpenChange={setView}
      >
        {view && (
          <OrderDetails
            onClose={() => {
              setView(false);
            }}
            data={view}
          />
        )}
      </Modal>
    </>
  );
}
