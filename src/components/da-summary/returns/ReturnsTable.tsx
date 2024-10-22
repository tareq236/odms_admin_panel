import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function ReturnsTable({
  returnProducts,
  showBillingNo = false,
}: {
  returnProducts: any[];
  showBillingNo?: boolean;
}) {
  return (
    <>
      <Table className="mt-3 [&_td]:p-3 [&_th]:h-fit [&_th]:p-3 [&_tr:last-child]:border-b">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Product name</TableHead>
            {showBillingNo && <TableHead>Billing No.</TableHead>}
            <TableHead>Batch</TableHead>
            <TableHead align="right" className="text-right">
              Quantity
            </TableHead>
            <TableHead align="right" className="text-right">
              Net value
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {returnProducts &&
            returnProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.matnr}</TableCell>
                <TableCell>{item.material_name}</TableCell>
                {showBillingNo && <TableCell>{item.billing_doc_no}</TableCell>}

                <TableCell>{item.batch}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.net_val}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ReturnsTable;
