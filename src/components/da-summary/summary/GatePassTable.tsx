import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/formatters";
import React from "react";

function GatePassTable({
  totalInvoice,
  totalAmount,
  totalDelivered,
  totalDeliveredAmount,
  deliveryRemaining,
  deliveryRemainingAmount,
  cashCollection,
  cashCollectionAmount,
  cashCollectionRemaining,
  cashCollectionRemainingAmount,
  totalReturn,
  returnAmount,
  totalCredit,
  totalCreditAmount,
}: {
  totalInvoice: number;
  totalAmount: number;
  totalDelivered: number;
  totalDeliveredAmount: number;
  deliveryRemaining: number;
  deliveryRemainingAmount: number;
  cashCollection: number;
  cashCollectionAmount: number;
  cashCollectionRemaining: number;
  cashCollectionRemainingAmount: number;
  totalReturn: number;
  returnAmount: number;
  totalCredit: number;
  totalCreditAmount: number;
}) {
  return (
    <>
      <Table className="mt-3 [&_td]:p-3 [&_th]:h-fit [&_th]:p-3 [&_tr:last-child]:border-b">
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
            <TableCell>{formatNumber(totalInvoice)}</TableCell>
            <TableCell>{formatNumber(totalAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delivered</TableCell>
            <TableCell>{formatNumber(totalDelivered)}</TableCell>
            <TableCell>{formatNumber(totalDeliveredAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delivery Remaining</TableCell>
            <TableCell>{formatNumber(deliveryRemaining)}</TableCell>
            <TableCell>{formatNumber(deliveryRemainingAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cash Collection</TableCell>
            <TableCell>{formatNumber(cashCollection)}</TableCell>
            <TableCell>{formatNumber(cashCollectionAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Collection Remaining</TableCell>
            <TableCell>{formatNumber(cashCollectionRemaining)}</TableCell>
            <TableCell>{formatNumber(cashCollectionRemainingAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Credit Amount</TableCell>
            <TableCell>{formatNumber(totalCredit)}</TableCell>
            <TableCell>{formatNumber(totalCreditAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Return</TableCell>
            <TableCell>{formatNumber(totalReturn)}</TableCell>
            <TableCell>{formatNumber(returnAmount)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default GatePassTable;
