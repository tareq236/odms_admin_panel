"use client";

import { formatDate, formatNumber } from "@/lib/formatters";
import React from "react";

function DeliveryDetailsView({ details }: { details: any }) {
  return (
    <article>
      <div className="billing-info flex gap-5 text-sm border-b pb-5">
        <div className="">
          <h3 className="text-[12px] text-gray-500">Bill No.</h3>
          <h4>{details.billing_doc_no}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Bill Date</h3>
          <h4>{formatDate(details.billing_date)}</h4>
        </div>
      </div>

      <div className="billing-details grid grid-cols-2 md:grid-cols-3 gap-3 text-sm border-b py-5">
        <div className="">
          <h3 className="text-[12px] text-gray-500">DA Code</h3>
          <h4>{details.da_code}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">DA Name</h3>
          <h4>{details.da_name}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Partner</h3>
          <h4>{details.partner_name}</h4>
        </div>
        <div className=" col-span-2">
          <h3 className="text-[12px] text-gray-500">Address</h3>
          <h4>{details.address}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Vehicle No.</h3>
          <h4>{details.vehicle_no}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Gate Pass No.</h3>
          <h4>{details.gate_pass_no}</h4>
        </div>
      </div>

      <div className="billing-amount mt-5 text-sm grid grid-cols-3 gap-5">
        <div className="">
          <h3 className="text-[12px] text-gray-500">Total bill No.</h3>
          <h4>{formatNumber(details.no_of_bill)}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Total Quantity</h3>
          <h4>{formatNumber(details.total_quantity)}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Total Net Value</h3>
          <h4>{formatNumber(details.total_net_val)}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Total VAT</h3>
          <h4>{formatNumber(details.total_vat)}</h4>
        </div>
        <div className="">
          <h3 className="text-[12px] text-gray-500">Total TP</h3>
          <h4>{formatNumber(details.total_tp)}</h4>
        </div>
      </div>
    </article>
  );
}

export default DeliveryDetailsView;
