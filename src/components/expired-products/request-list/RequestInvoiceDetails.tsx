import { RequestlistDetails } from "@/types/request-list";
import React, { ReactNode } from "react";
import StatusBadge from "../StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table2 } from "lucide-react";

export default function RequestInvoiceDetails({
  data,
}: {
  data: RequestlistDetails;
}) {
  return (
    <section className="flex flex-col gap-4 w-full">
      {/* bill info */}
      <CustomSection>
        <Field name="ID" value={data.id} />
        <Field name="Invoice No." value={data.invoice_no} />
        <Field name="Invoice Type" value={data.invoice_type} />
        <Field
          name="Status"
          value={<StatusBadge status={data.last_status} />}
        />
      </CustomSection>

      <CustomSection>
        <Field name="Depot" value={`${data.depot_name} (${data.depot_id})`} />
        <Field name="Route" value={`${data.route_name} (${data.route_id})`} />
      </CustomSection>

      {/* mio info */}
      <CustomSection>
        <Field name="MIO ID" value={data.mio_id} />
        <Field name="Name" value={data.mio_name} />
        <Field name="Mobile" value={data.mio_mobile} />
      </CustomSection>

      {/* Region Manager info */}
      <CustomSection>
        <Field name="RM ID" value={data.rm_id} />
        <Field name="Name" value={data.rm_name} />
        <Field name="Mobile" value={data.rm_mobile} />
      </CustomSection>

      {/* Customer info */}
      <CustomSection>
        <Field name="Partner ID" value={data.partner_id} />
        <Field name="Partner Name" value={data.partner_name} />
        <Field name="Customer Name" value={data.customer_name} />
        <Field name="Customer Mobile" value={data.customer_number} />
        <Field name="Address" value={data.customer_address} />
      </CustomSection>

      {/* da info */}
      {data.da_id && (
        <CustomSection>
          <Field name="DA ID" value={data.da_id} />
          <Field name="Name" value={data.da_name} />
          <Field name="Mobile" value={data.da_mobile} />
        </CustomSection>
      )}

      {/* request status info */}
      <CustomSection>
        <Field
          name="Request Approval"
          value={approval(data.request_approval)}
        />
        <Field name="Request Date" value={data?.request_date ?? "-"} />
        <Field
          name="Request Approval Date"
          value={data.request_approval_date}
        />
      </CustomSection>

      {/* order status info */}
      <CustomSection>
        <Field name="Order Approval" value={approval(data.order_approval)} />
        <Field name="Order Delivery" value={approval(data?.order_delivery)} />
        <Field name="Order Date" value={data?.order_date ?? "-"} />
        <Field
          name="Order Approval Date"
          value={data.order_approval_date ?? "-"}
        />
        <Field name="Delivery Date" value={data.delivery_date ?? "-"} />
      </CustomSection>

      {/* other status info */}
      <CustomSection>
        <Field
          name="Order Replacement"
          value={approval(data.replacement_order)}
        />
        <Field
          name="Withdrawal Confirmation"
          value={approval(data?.withdrawal_confirmation)}
        />
        <Field
          name="Withdrawal Approval Date"
          value={data?.withdrawal_date ?? "-"}
        />
        <Field
          name="Withdrawal Date"
          value={data?.withdrawal_approval_date ?? "-"}
        />
        <Field
          name="Order Approval Date"
          value={data.order_approval_date ?? "-"}
        />
      </CustomSection>

      {/* request list table */}
      <div className="text-primary flex items-center gap-2 mt-3 font-semibold">
        <Table2 className="size-4" />{" "}
        <h2 className="text-foreground">Request Product List</h2>
      </div>
      <div className="max-w-[90vw] w-full mx-auto border rounded-md">
        <Table className="w-full [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:text-sm [&_th]:text-sm [&_td]:p-2 [&_th]:p-2">
          <TableHeader className="[&_tr]:border-y-0 [&_tr]:border-b">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Matnr</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Producer</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Pack Qty.</TableHead>
              <TableHead>Strip Qty.</TableHead>
              <TableHead>Unit Qty.</TableHead>
              <TableHead>Net Val.</TableHead>
              <TableHead>Unit TP</TableHead>
              <TableHead>Unit VAT</TableHead>
              <TableHead>Expire Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.request_list &&
              data.request_list.map((item) => (
                <TableRow key={item.list_id}>
                  <TableCell>{item.list_id}</TableCell>
                  <TableCell>{item.matnr}</TableCell>
                  <TableCell>{item.material_name}</TableCell>
                  <TableCell>{item.producer_company}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.pack_qty}</TableCell>
                  <TableCell>{item.strip_qty}</TableCell>
                  <TableCell>{item.unit_qty}</TableCell>
                  <TableCell>{item.net_val}</TableCell>
                  <TableCell>{item.unit_tp}</TableCell>
                  <TableCell>{item.unit_vat}</TableCell>
                  <TableCell>{item.expire_date ?? "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

const CustomSection = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="flex items-center gap-x-5 gap-y-3 flex-wrap border-b pb-3"
      {...props}
    />
  );
};

const Field = ({
  name,
  value,
}: {
  name: string;
  value: string | number | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h4 className="text-sm text-muted-foreground">{name}</h4>
      {typeof value !== "string" || typeof value !== "number" ? (
        <p className="text-sm font-semibold">{value}</p>
      ) : (
        value
      )}
    </div>
  );
};

const approval = (value: 0 | 1) => {
  return value === 1 ? "Yes" : "No";
};
