import { WithdrawalConfirmation } from "@/types/request-list";
import React, { ReactNode } from "react";
import { Table2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { formatDateTZ } from "@/lib/formatters";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { confirmWithdrawal } from "@/app/admin/expired-products/_actions/request-list";
import { toast } from "sonner";
import { approval, CustomSection, Field } from "../../section";

export default function WithdrawalDetails({
  data,
  onClose,
}: {
  data: WithdrawalConfirmation;
  onClose: () => void;
}) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* bill info */}
      <CustomSection>
        <Field name="Invoice No." value={data.invoice_no} />
        <Field
          name="Status"
          value={<StatusBadge status={data.last_status} />}
        />
      </CustomSection>

      {/* Customer info */}
      <CustomSection>
        <Field name="Partner ID" value={data.partner_id} />
        <Field name="Partner Name" value={data.partner_name} />
        <Field name="Address" value={data.partner_address} />
      </CustomSection>

      {/* da info */}
      {data.da_id && (
        <CustomSection>
          <Field name="DA ID" value={data.da_id} />
          <Field name="Name" value={data.da_name} />
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
        <h2 className="text-foreground">Withdrawal List</h2>
      </div>
      <div className=" w-full max-w-[90vw] md:max-w-[61rem] mx-auto border border-muted-foreground/75 rounded-md overflow-x-auto">
        <table className="w-full [&_th]:border-r [&_*]:border-muted-foreground/50 [&_td]:border-r [&_td]:text-nowrap [&_td]:text-sm [&_th]:text-sm [&_td]:p-2 [&_th]:p-2">
          <thead className="[&_tr]:border-y-0 [&_tr]:border-b bg-muted/50">
            <tr>
              <th rowSpan={2}>Matnr</th>
              <th rowSpan={2} className="border-r-2">
                Name
              </th>
              <th rowSpan={2} className="border-r-2">
                Batch
              </th>
              <th colSpan={3} className="border-r-2">
                Request
              </th>
              <th colSpan={3} className="border-r-2">
                Withdrawal
              </th>
              <th rowSpan={2}>Expire Date</th>
            </tr>
            <tr>
              <th>Pack Qty.</th>
              <th>Tab/Cap/Amp</th>
              <th className="border-r-2">Net Value</th>
              <th>Pack Qty.</th>
              <th>Tab/Cap/Amp</th>
              <th className="border-r-2">Net Value</th>
            </tr>
          </thead>
          <tbody className="[&_tr]:border-b [&_tr]:last::border-b-0">
            {data.materials &&
              data.materials.map((item) => (
                <tr key={item.batch}>
                  <td>{item.matnr}</td>
                  <td className="border-r-2">{item.material_name}</td>
                  <td className="border-r-2">{item.batch}</td>
                  <td>{item.request_pack_qty}</td>
                  <td>{item.request_unit_qty}</td>
                  <td className="border-r-2">{item.request_net_val}</td>
                  <td>{item.withdrawal_pack_qty}</td>
                  <td>{item.withdrawal_unit_qty}</td>
                  <td className="border-r-2">{item.withdrawal_net_val}</td>
                  <td>{formatDateTZ(new Date(item.expire_date))}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* footer with buttons */}
      {data.last_status === "withdrawal_approval" && (
        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                toast.promise(
                  confirmWithdrawal({
                    invoiceNo: data.invoice_no,
                  }),
                  {
                    loading: "Loading...",
                    success: (data) => {
                      if (data.success === false) {
                        throw data;
                      }
                      onClose();
                      return `${data.message}`;
                    },
                    error: (data) => {
                      return `${data.message}`;
                    },
                  }
                );
              });
            }}
          >
            Withdrawal Confirm
          </Button>
        </DialogFooter>
      )}
    </section>
  );
}
