import React from "react";
import { Table2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReplacementOrderWithMatnr } from "@/types/replacement-order";
import { approval, CustomSection, Field } from "../section";

export default function OrderDetails({
  data,
  onClose,
}: {
  data: ReplacementOrderWithMatnr;
  onClose: () => void;
}) {
  return (
    <section className="flex flex-col gap-4 w-full">
      {/* bill info */}
      <CustomSection>
        <Field name="Invoice No." value={data.invoice_no} />
        <Field
          name="Status"
          value={<Badge variant={"outline"}>{data.last_status}</Badge>}
        />
      </CustomSection>

      {/* Customer info */}
      <CustomSection>
        <Field name="Partner ID" value={data.partner_id} />
        <Field name="Partner Name" value={data.partner_name} />
        <Field name="Address" value={data.partner_address} />
        <Field name="Contact Person" value={data.contact_person} />
      </CustomSection>

      {/* da info */}
      {data.delivery_da_id && (
        <CustomSection>
          <Field name="DA ID" value={data.delivery_da_id} />
          {/* <Field name="Name" value={data.da_name} /> */}
        </CustomSection>
      )}

      {/* other status info */}
      <CustomSection>
        <Field name="Order Date" value={data?.order_date ?? "-"} />
        <Field
          name="Order Approval Date"
          value={data?.order_approval_date ?? "-"}
        />
      </CustomSection>

      {/* request list table */}
      <div className="text-primary flex items-center gap-2 mt-3 font-semibold">
        <Table2 className="size-4" />{" "}
        <h2 className="text-foreground">Order List</h2>
      </div>
      <div className=" w-full max-w-[90vw] md:max-w-[61rem] mx-auto border border-muted-foreground/75 rounded-md overflow-x-auto">
        <table className="w-full [&_th]:border-r [&_*]:border-muted-foreground/50 [&_td]:border-r [&_td]:text-nowrap [&_td]:text-sm [&_th]:text-sm [&_td]:p-2 [&_th]:p-2">
          <thead className="[&_tr]:border-b bg-muted/50">
            <tr>
              <th>Matnr</th>
              <th>Name</th>
              <th>Pack Qty.</th>
              <th>Tab/Cap/Amp</th>
              <th className="border-r-2">Net Value</th>
            </tr>
          </thead>
          <tbody className="[&_tr]:border-b [&_tr]:last::border-b-0">
            {data.materials &&
              data.materials.map((item) => (
                <tr key={item.matnr}>
                  <td>{item.matnr}</td>
                  <td>{item.material_name}</td>
                  <td>{item.pack_qty}</td>
                  <td>{item.unit_qty}</td>
                  <td>{item.net_val}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type Approval = 0 | 1;
