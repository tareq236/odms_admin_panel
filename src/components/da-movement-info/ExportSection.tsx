"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

function ExportSection() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = ``;
    str += `\r\n`;
    str +=
      "da code, da name, movement distance (km), movement time (minutes), movement time (hours),  date \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = ``;
      for (let index in array[i]) {
        if (line !== "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }

    return str;
  };

  const downloadCSV = async () => {
    const res = await fetch(
      `/api/movement-info?filter=${
        searchParams.has("filter") ? searchParams.get("filter") : "d"
      }${searchParams.has("q") ? "&q=" + searchParams.get("q") : ""}`
    );
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error);
      return;
    }
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `da_movement_info.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await downloadCSV();
          });
        }}
      >
        {isPending ? (
          <Spinner
            borderBottomColor="borber-b-background"
            className="mr-2 size-4"
          />
        ) : (
          <Download className="size-4 mr-2" />
        )}
        <span>Export</span>
      </Button>
    </>
  );
}

export default ExportSection;
