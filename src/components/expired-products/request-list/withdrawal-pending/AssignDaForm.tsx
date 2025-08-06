"use client";

import { getDaData } from "@/app/admin/expired-products/_actions/da";
import { updateAssignDA } from "@/app/admin/expired-products/_actions/request-list";
import { Combobox } from "@/components/combobox/Combobox";
import { useDebounce } from "@/hooks/useDebounce";
import { rdl_users_list } from "@/prisma/generated/client1";
import React from "react";
import { toast } from "sonner";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function AssignDaForm({
  depotCode,
  invoiceNo,
}: {
  depotCode: string;
  invoiceNo: string;
}) {
  const [data, setData] = React.useState<rdl_users_list[]>([]);
  const [search, setSearch] = React.useState("");
  const debouceInput = useDebounce(search);

  // get da list on search
  const handleDaData = async () => {
    const res = await getDaData({ depotCode, search: search });
    setData(res.data);
    if (res.success === false) {
      toast.error(res.error);
    }
  };

  React.useEffect(() => {
    handleDaData();
  }, [debouceInput]);

  return (
    <form>
      <Combobox
        placeholder="Assign DA"
        data={data.map((item) => ({
          label: `${item.full_name} (${item.sap_id})`,
          value: item.sap_id.toString(),
        }))}
        onValueChange={(value) => setSearch(value)}
        onSelect={async (value) => {
          // assign DA and add loading transition in toast
          toast.promise(
            updateAssignDA({
              daId: Number(value),
              invoiceNo: Number(invoiceNo),
            }),
            {
              loading: "Loading...",
              success: (data) => {
                if (data.success === false) {
                  throw data;
                }
                return `${data.message}`;
              },
              error: (data) => {
                return `${data.message}`;
              },
            }
          );
        }}
      />
    </form>
  );
}
