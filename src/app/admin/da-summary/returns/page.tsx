import ReturnsTable from "@/components/da-summary/returns/ReturnsTable";
import React from "react";
import NoData from "@/components/constants/NoData";
import { getReturnData } from "./_actions/action";

async function ReturnSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const { returnProducts, billingDocs, singleBills } = await getReturnData(
    searchParams,
  );

  return (
    <div className="flex flex-col gap-5">
      <ReturnsTable
        show={true}
        title="Overview"
        returnProducts={returnProducts as any[]}
      />

      {singleBills && singleBills.length > 0 ? (
        singleBills.map((item) => (
          <ReturnsTable
            key={item}
            title={`Billing No - ${item[0].billing_doc_no}`}
            returnProducts={item}
          />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <NoData />
        </div>
      )}
    </div>
  );
}

export default ReturnSummaryPage;
