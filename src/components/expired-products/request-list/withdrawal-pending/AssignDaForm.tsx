"use client";

import { getDaData } from "@/app/admin/expired-products/_actions/da";
import { Combobox } from "@/components/combobox/Combobox";
import { useDebounce } from "@/hooks/useDebounce";
import { rdl_users_list } from "@/prisma/generated/client1";
import React from "react";

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

export default function AssignDaForm({ depotCode }: { depotCode: string }) {
  const [data, setData] = React.useState<rdl_users_list[]>([]);
  const [search, setSearch] = React.useState("");
  const debouceInput = useDebounce(search);

  const handleDaData = async () => {
    const res = await getDaData({ depotCode, search: search });

    setData(res.data);
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
      />
    </form>
  );
}
