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

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import StatusTag from "./StatusTag";
import { useRouter } from "next-nprogress-bar";

function DeliveryCollectionTable({
  data,
  connectionError,
  children,
}: {
  data: any[];
  connectionError: boolean;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [view, setView] = useState<any>(false);

  const pathName = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <>
      <Table className="[tr:text-nowrap]">
        <TableHeader>
          <TableRow>
            <TableHead>Billing No.</TableHead>
            <TableHead>Billing Date</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Collection Status</TableHead>
            <TableHead>Collection</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Returned</TableHead>
            <TableHead>Net Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!searchParams.has("q") ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={9}
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
                colSpan={9}
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
                <TableCell>
                  <Button
                    variant={"link"}
                    className="rounded-full"
                    onClick={() => {
                      setView(true);
                      params.set("dId", `${item.billing_doc_no}`);
                      router.push(`${pathName}?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {item.billing_doc_no}
                  </Button>
                </TableCell>
                <TableCell>{formatDate(item.billing_date)}</TableCell>
                <TableCell>
                  {item.name1} ({item.partner})
                </TableCell>
                <TableCell>
                  <StatusTag status={item.delivery_status || ""} />
                </TableCell>
                <TableCell>
                  <StatusTag status={item.cash_collection_status || ""} />
                </TableCell>
                <TableCell>
                  {formatNumber(Number(item.cash_collection))}
                </TableCell>
                <TableCell>
                  {formatNumber(
                    Number(item.due_amount),
                  )}
                </TableCell>
                <TableCell>
                  {formatNumber(
                    Number(item.return_amount),
                  )}
                </TableCell>
                <TableCell>{formatNumber(Number(item.net_val) - Number(item.return_amount))}</TableCell>
                <TableCell>
                  <Button
                    variant={"link"}
                    className="rounded-full"
                    onClick={() => {
                      setView(true);
                      params.set("dId", `${item.billing_doc_no}`);
                      router.push(`${pathName}?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // for no data
            <>
              <TableRow>
                <TableCell
                  colSpan={9}
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
      <Dialog
        open={view}
        onOpenChange={() => {
          setView(false);
          params.delete("dId");
          router.push(pathName + "?" + params.toString(), { scroll: false });
        }}
      >
        <DialogContent className="md:w-[90vw] md:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="size-4 text-primary" />
              <span>Delivery Collection Details</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeliveryCollectionTable;
