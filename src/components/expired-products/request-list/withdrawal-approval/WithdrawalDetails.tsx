import {
  RequestlistDetails,
  WithdrawalConfirmation,
} from "@/types/request-list";
import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table2 } from "lucide-react";
import StatusBadge from "../../StatusBadge";
import { formatDateTZ } from "@/lib/formatters";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { confirmWithdrawal } from "@/app/admin/expired-products/_actions/request-list";
import { toast } from "sonner";

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
      <div className=" w-full max-w-[90vw] md:max-w-[61rem] mx-auto border rounded-md overflow-x-auto">
        <table className="w-full [&_td]:text-nowrap [&_td]:text-sm [&_th]:text-sm [&_td]:p-2 [&_th]:p-2">
          <thead className="[&_tr]:border-y-0 [&_tr]:border-b">
            <tr>
              <th>Matnr</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Pack Qty. (Request)</th>
              <th>Unit Qty. (Request)</th>
              <th>Net Value (Request)</th>
              <th>Pack Qty. (Withdrawal)</th>
              <th>Unit Qty. (Withdrawal)</th>
              <th>Net Value (Withdrawal)</th>
              <th>Expire Date</th>
            </tr>
          </thead>
          <tbody>
            {data.materials &&
              data.materials.map((item) => (
                <tr key={item.batch}>
                  <td>{item.matnr}</td>
                  <td>{item.material_name}</td>
                  <td>{item.batch}</td>
                  <td>{item.request_pack_qty}</td>
                  <td>{item.request_unit_qty}</td>
                  <td>{item.request_net_val}</td>
                  <td>{item.withdrawal_pack_qty}</td>
                  <td>{item.withdrawal_unit_qty}</td>
                  <td>{item.withdrawal_net_val}</td>
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

type Approval = 0 | 1;

const approval = (value: Approval | boolean) => {
  return value === 1 || value === true ? "Yes" : "No";
};
