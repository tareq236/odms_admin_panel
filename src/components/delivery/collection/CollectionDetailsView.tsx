import { formatDate, formatNumber } from "@/lib/formatters";
import React from "react";
import StatusTag from "./StatusTag";
import db from "../../../../db/db";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GoogleMap from "@/components/google-map/GoogleMap";
import { MapPin } from "lucide-react";

export default async function CollectionDetailsView({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string; dId: string };
}) {

  const [deliveryDetails, invoiceInfo,invoiceSalesInfo ] = await Promise.all([
    db.rdl_delivery.findFirst({
      where: { billing_doc_no: searchParams.dId },
      select: {
        delivery_status: true,
        cash_collection_status: true,
        delivery_latitude: true,
        delivery_longitude: true,
        id: true,
      },
    }),db.rdl_delivery_info_sap.findFirst({
      where: {
        billing_doc_no: searchParams.dId,
      },
      select: {
        da_code: true,
        da_name: true,
        billing_date: true,
        vehicle_no: true,
      },
    }),
    db.$queryRaw`
      select rsis.*, rm.material_name FROM rpl_sales_info_sap rsis
      INNER JOIN rpl_material rm ON rsis.matnr=rm.matnr
      WHERE rsis.billing_doc_no=${searchParams.dId || 0}
    `
  ])

  let invoiceSalesInfoWithMaterial: any[] = invoiceSalesInfo ? invoiceSalesInfo as any[] : []

  const [partnerInfo, deliveryList, totalValue, invoiceTotalValue] = await Promise.all([
    db.rpl_customer.findUnique({
      where: { partner: invoiceSalesInfoWithMaterial?.[0]?.partner || "" },
      select: {
        name1: true,
        street: true,
        street1: true,
        district: true,
        upazilla: true,
        mobile_no: true,
      },
    }),
    db.$queryRaw`
      SELECT rdl.*, rm.material_name FROM rdl_delivery_list rdl
      INNER JOIN rpl_material rm ON rdl.matnr=rm.matnr
      where rdl.delivery_id = ${Number(deliveryDetails?.id || 0)}
    `,

    db.rdl_delivery_list.aggregate({
      where: {
        delivery_id: Number(deliveryDetails?.id || 0),
      },
      _sum: {
        delivery_net_val: true,
        return_net_val: true,
        quantity: true,
        return_quantity: true,
        delivery_quantity:true,
      },
    }),
    db.rpl_sales_info_sap.aggregate({
      where: {
        billing_doc_no: searchParams.dId
      },
      _sum: {
        net_val: true,
        vat: true,
        quantity: true
      }
    })
  ]);

  let deliveryListMaterial: any[] = deliveryList ? deliveryList as any[] : []

  return (
    <article className="w-full mx-auto max-h-[50rem] overflow-y-auto h-[28rem] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl">
      {/* billing info */}
      <section className="billing-info flex gap-5 text-sm border-b pb-5 flex-wrap">
        <DetailsField fieldName="Bill No." fieldContent={searchParams.dId} />
        <DetailsField
          fieldName="Bill Date"
          fieldContent={formatDate(invoiceInfo?.billing_date as Date)}
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

      <section className="billing-details grid lg:grid-cols-2 gap-3 text-sm border-b py-5">
        {/*  da and partner info */}
        <section className="h-fit grid grid-cols-3 gap-3 md:gap-5">
          <DetailsField
            fieldName="DA Code"
            fieldContent={invoiceInfo?.da_code}
          />
          <DetailsField
            className="col-span-2"
            fieldName="DA Name"
            fieldContent={invoiceInfo?.da_name}
          />
          <DetailsField
            className="col-span-2"
            fieldName="Partner"
            fieldContent={partnerInfo?.name1}
          />
          <DetailsField
            fieldName="Contact"
            fieldContent={partnerInfo?.mobile_no}
          />
          <DetailsField
            className="col-span-3"
            fieldName="Address"
            fieldContent={`${partnerInfo?.street || partnerInfo?.street1}
            ${partnerInfo?.upazilla ? ", " + partnerInfo.upazilla : null}
            ${partnerInfo?.district ? ", " + partnerInfo.district : null}
            `}
          />
          <DetailsField
            className="col-span-2 md:col-span-1"
            fieldName="Vehicle No."
            fieldContent={invoiceInfo?.vehicle_no}
          />
          <DetailsField
            fieldName="Gate Pass No."
            fieldContent={invoiceSalesInfoWithMaterial?.[0]?.gate_pass_no}
          />
        </section>

        {/* google map */}
        {deliveryDetails?.delivery_status?.toLowerCase() === "done" && (
          <section className="flex flex-col gap-3">
            <h5 className="text-muted-foreground flex items-center">
              <MapPin className="size-4 mr-2 text-primary" />
              <span>Delivery Location</span>
            </h5>
            <section className="w-full rounded overflow-hidden border border-primary p-0.25">
              <GoogleMap
                latitude={Number(deliveryDetails?.delivery_latitude || 23.81)}
                longitude={Number(deliveryDetails?.delivery_longitude || 90.41)}
              />
            </section>
          </section>
        )}
      </section>

      {/* product delivery table */}
      <section className="mt-5 w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product name</TableHead>
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

          <TableBody>
            {deliveryListMaterial && deliveryListMaterial?.length > 0
              ? deliveryListMaterial.map((item) => (
                  <TableRow key={item.id} className="text-right">
                    <TableCell className="text-left">{item.material_name}</TableCell>
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
                ))
              : invoiceSalesInfoWithMaterial.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left">{item.material_name}</TableCell>
                    <TableCell>{Number(item.quantity)}</TableCell>
                    <TableCell>{formatNumber(Number(item.tp))}</TableCell>
                    <TableCell>{formatNumber(Number(item.vat))}</TableCell>
                    <TableCell>{formatNumber(Number(item.net_val))}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(invoiceTotalValue._sum.quantity))}
              </TableCell>

              <TableCell colSpan={2} align="right">
                {formatNumber(Number(invoiceTotalValue._sum.vat))}
              </TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(invoiceTotalValue._sum.net_val))}
              </TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(totalValue._sum.delivery_quantity))}
              </TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(totalValue._sum.delivery_net_val))}
              </TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(totalValue._sum.return_quantity))}
              </TableCell>
              <TableCell colSpan={1} align="right">
                {formatNumber(Number(totalValue._sum.return_net_val))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
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
