"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
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
    str += `,,,,,,,,,,Total Amount,${array[0]["total_delivery_amount"]},Total Return,${array[0]["total_return"]},Total Collection,${array[0]["total_collection"]},Total Due,${array[0]["total_due"]},Total Product=${array[0]["overall_product"]},Total Quantity=${array[0]["overall_quantity"]},,`;

    return str;
  };

  const downloadCSV = async () => {
    const startDate = searchParams.has("start")
      ? searchParams.get("start")
      : formateDateDB(new Date());

    const res = await fetch(
      `/api/collection?q=${searchParams.get("q")}&start=${startDate}`,
    );
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${searchParams.get("q")}-${startDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if(!searchParams.has('q')) return null

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
          <Spinner borderBottomColor="borber-b-background" className="mr-2 size-4" />
        ) : (
          <Download className="size-4 mr-2" />
        )}
        <span>Export</span>
      </Button>
    </>
  );
}

export default ExportSection;
