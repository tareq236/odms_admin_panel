"use client";

import { Button } from "@/components/ui/button";
import { formateDateDB } from "@/lib/formatters";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

function ExportSection() {
  const searchParams = useSearchParams();
  const [ isPending, startTransition ] = useTransition();

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = `Doctor - ${array[0].doctor.fullName} (${array[0].doctor.childId})  \r\n`;
    str += `\r\n`;
    str +=
      "ID, Viewer's Name, Viewer's Email, Viewer's Mobile, Visited_at \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = `${i + 1}`;
      for (let index in array[i]) {
        if (line !== "") line += ",";
        if (index !== "doctor") {
          if (index !== "createdAt") {
            line += array[i][index];
          } else {
            line += format(new Date(array[i][index]), "dd LLL yyyy - h:mm aaa");
          }
        }
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = async (id: number, name: string) => {
    const res = await fetch(
      `/api/collection?q=${searchParams.get("q")}&start=${
        searchParams.has("start")
          ? searchParams.get("start")
          : formateDateDB(new Date())
      }`,
    );
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button disabled={isPending} onClick={() => {
        startTransition(async() => {
            await downloadCSV(1, '')
        })
      }}>
        <Download className="size-4 mr-2" />
        <span>CSV</span>
      </Button>
    </>
  );
}

export default ExportSection;
