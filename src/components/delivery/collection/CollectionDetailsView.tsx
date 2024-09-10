import { formatDate, formatNumber } from "@/lib/formatters";
import { rdl_delivery } from "@prisma/client";
import React, { Suspense } from "react";
import StatusTag from "./StatusTag";
import db from "../../../../db/db";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function CollectionDetailsView({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string; dId: string };
}) {
  const deliveryDetails = await db.rdl_delivery.findUnique({
    where: { id: Number(searchParams.dId || 0) },
  });

  const [daInfo, partnerInfo, routeInfo, deliveryList] = await Promise.all([
    db.rdl_user_list.findUnique({
      where: { sap_id: Number(deliveryDetails?.da_code || 0) },
      select: { full_name: true },
    }),
    db.rpl_customer.findUnique({
      where: { partner: deliveryDetails?.partner || "" },
      select: { name1: true },
    }),
    db.rdl_route_sap.findUnique({
      where: { route: deliveryDetails?.route_code || "" },
      select: { description: true },
    }),
    db.rdl_delivery_list.findMany({
      where: {
        delivery_id: Number(searchParams.dId || 0),
      },
    }),
  ]);

  return (
    <article className="w-full mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-5xl">
      <section className="billing-info flex gap-5 text-sm border-b pb-5 flex-wrap">
        <DetailsField
          fieldName="Bill No."
          fieldContent={deliveryDetails?.billing_doc_no}
        />
        <DetailsField
          fieldName="Bill Date"
          fieldContent={formatDate(deliveryDetails?.billing_date as Date)}
        />
        <DetailsField
          fieldName="Delivery Status"
          fieldContent={
            <StatusTag status={deliveryDetails?.delivery_status || ""} />
          }
        />
        <DetailsField
          fieldName="Collection Status"
          fieldContent={
            <StatusTag status={deliveryDetails?.cash_collection_status || ""} />
          }
        />
      </section>

      <section className="billing-details grid grid-cols-2 gap-3 text-sm border-b py-5">
        <DetailsField
          fieldName="DA Code"
          fieldContent={deliveryDetails?.da_code}
        />
        <DetailsField fieldName="DA Name" fieldContent={daInfo?.full_name} />
        <DetailsField fieldName="Partner" fieldContent={partnerInfo?.name1} />
        <DetailsField
          fieldName="Address"
          fieldContent={routeInfo?.description}
        />
        <DetailsField
          fieldName="Vehicle No."
          fieldContent={deliveryDetails?.vehicle_no}
        />
        <DetailsField
          fieldName="Gate Pass No."
          fieldContent={deliveryDetails?.gate_pass_no}
        />
      </section>
      <section className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch</TableHead>
              <TableHead>Qty.</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>VAT</TableHead>
              <TableHead>Net Value</TableHead>
              <TableHead>Delivered Qty.</TableHead>
              <TableHead>Delivered Value</TableHead>
              <TableHead>Returned Qty.</TableHead>
              <TableHead>Returned Value</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <section className="w-full max-h-[12rem] overflow-auto">
          <Table>
            <TableBody>
              {deliveryList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{Number(item.quantity)}</TableCell>
                  <TableCell>{formatNumber(Number(item.tp))}</TableCell>
                  <TableCell>{formatNumber(Number(item.vat))}</TableCell>
                  <TableCell>{formatNumber(Number(item.net_val))}</TableCell>
                  <TableCell>{Number(item.delivery_quantity)}</TableCell>
                  <TableCell>
                    {formatNumber(Number(item.delivery_net_val))}
                  </TableCell>
                  <TableCell>{Number(item.return_quantity)}</TableCell>
                  <TableCell>
                    {formatNumber(Number(item.return_net_val))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>
    </article>
  );
}

const DetailsField = ({
  className,
  fieldName,
  fieldContent,
}: {
  className?: string;
  fieldName: string;
  fieldContent: string | React.ReactNode;
}) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-[12px] text-gray-500">{fieldName}</h3>
      <h4>{fieldContent}</h4>
    </div>
  );
};
