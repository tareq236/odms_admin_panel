import NoData from "@/components/constants/NoData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function DueTable({
  dueData,
  showPartnerInfo = false,
}: {
  dueData: any[];
  showPartnerInfo?: boolean;
}) {
  return (
    <>
      <Table className="mt-3 [&_td]:p-3 [&_th]:h-fit [&_th]:p-3 [&_tr:last-child]:border-b">
        <TableHeader>
          <TableRow>
            {showPartnerInfo && (
              <>
                <TableHead>Partner Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
              </>
            )}
            <TableHead>Billing No.</TableHead>
            <TableHead className="text-right">Due Amount</TableHead>
            <TableHead className="text-right">Total Net Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dueData.length > 0 ? (
            dueData.map((item, index) => (
              <TableRow key={index}>
                {showPartnerInfo && (
                  <>
                    <TableCell>{item.partner}</TableCell>
                    <TableCell>{item.name1}</TableCell>
                    <TableCell>
                      {item.street}, {item.district}
                    </TableCell>
                  </>
                )}
                <TableCell>{item.billing_doc_no}</TableCell>
                <TableCell className="text-right">{item.due_amount}</TableCell>
                <TableCell className="text-right">{item.net_val}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="">
              <TableCell colSpan={6}>
                <NoData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default DueTable;
