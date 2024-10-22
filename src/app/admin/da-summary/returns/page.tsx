import ReturnsTable from "@/components/da-summary/returns/ReturnsTable";
import React from "react";
import NoData from "@/components/constants/NoData";
import { getReturnData } from "./_actions/action";
import Accordion from "@/components/da-summary/accordion/Accordion";

async function ReturnSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const { returnProducts, singleBills } = await getReturnData(searchParams);

  return (
    <div className="flex flex-col gap-5">
      <Accordion name="Overview" show={true}>
        <ReturnsTable returnProducts={returnProducts as any[]} />
      </Accordion>

      {singleBills && singleBills.length > 0 ? (
        singleBills.map((item) => (
          <Accordion name={`Partner - ${item[0].name1}`} key={item}>
            <ReturnsTable showBillingNo={true} returnProducts={item} />
          </Accordion>
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
