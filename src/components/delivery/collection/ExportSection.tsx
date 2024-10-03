"use client";

import { Button } from "@/components/ui/button";
import { formateDateDB } from "@/lib/formatters";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

function ExportSection() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();


  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = ``;
    str += `\r\n`;
    str +=
    "ID,DA Code,DA Name,Billing Doc No.,Billing Data,Partner ID,Partner Name,Partner Contact,Route, Address,Delivery Status,Delivery Amount,Return Status,Return Amount,Collection Status,Collection Amount,Due Status,Due Amount,Total Product,Total Quantity,Gate Pass No.,Vehicle No. \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = `${i + 1}`;
      for (let index in array[i]) {
        if (line !== "") line += ",";
        if (
          index !== "total_delivery_amount" &&
          index !== "total_return" &&
          index !== "total_collection" &&
          index !== "total_due" &&
          index !== "overall_product" &&
          index !== "overall_quantity"
        ) {
          line += array[i][index];
        }
      }
      str += line + "\r\n";

    }
    str += `\r\n`;
    str += `\r\n`;
    str += `\r\n`;
    str += `,,,,,,,,,,Total Amount,${array[0]['total_delivery_amount']},Total Return,${array[0]['total_return']},Total Collection,${array[0]['total_collection']},Total Due,${array[0]['total_due']},Total Product=${array[0]['overall_product']},Total Quantity=${array[0]['overall_quantity']},,`;

    return str;
  };

  const downloadCSV = async () => {
    const res = await fetch(
      `/api/collection?q=${searchParams.get("q")}&start=${
        searchParams.has("start")
          ? searchParams.get("start")
          : formateDateDB(new Date())
      }`,
    );
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `asdf.csv`;
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
        <Download className="size-4 mr-2" />
        <span>CSV</span>
      </Button>
    </>
  );
}

export default ExportSection;
