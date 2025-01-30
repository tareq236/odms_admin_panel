import GatePassTable from "@/components/da-summary/summary/GatePassTable";
import React from "react";
import { getGatePassBill } from "./_actions/action";
import Accordion from "@/components/da-summary/accordion/Accordion";
import SearchDa from "@/components/constants/SearchDa";

async function GatePassSummaryPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const {
    totalDelivery,
    deliveryDone,
    returnQuantity,
    gatePassData,
    gatePasses,
    collectionDone,
  } = await getGatePassBill(searchParams);

  if (!searchParams.q) return <SearchDa />;

  return (
    <section className="flex flex-col gap-8">
      {/* overview */}

      <Accordion show={true} name="Overview">
        <GatePassTable
          totalInvoice={Number(totalDelivery[0]?.total_delivery || 0)}
          totalAmount={Number(totalDelivery[0]?.total_net_val || 0)}
          totalDelivered={deliveryDone[0]?.total_delivery_done || 0}
          totalDeliveredAmount={
            Number(deliveryDone[0]?.total_net_val || 0) -
            Number(returnQuantity[0]?.total_return_amount || 0)
          }
          deliveryRemaining={
            Number(totalDelivery[0]?.total_delivery || 0) -
            Number(deliveryDone[0]?.total_delivery_done || 0)
          }
          deliveryRemainingAmount={
            Number(totalDelivery[0]?.total_net_val || 0) -
            Number(deliveryDone[0]?.total_net_val || 0)
          }
          cashCollection={Number(collectionDone[0]?.total_collection_done || 0)}
          cashCollectionAmount={Number(collectionDone[0]?.total_net_val || 0)}
          cashCollectionRemaining={
            Number(deliveryDone[0]?.total_delivery_done || 0) -
            Number(collectionDone[0]?.total_collection_done || 0)
          }
          cashCollectionRemainingAmount={
            Number(deliveryDone[0]?.total_net_val || 0) -
              Number(collectionDone[0]?.total_net_val || 0) -
              Number(returnQuantity[0]?.total_return_amount || 0) >
            0.01
              ? Number(deliveryDone[0]?.total_net_val || 0) -
                Number(collectionDone[0]?.total_net_val || 0) -
                Number(returnQuantity[0]?.total_return_amount || 0)
              : 0
          }
          totalReturn={Number(returnQuantity[0]?.total_return || 0)}
          returnAmount={Number(returnQuantity[0]?.total_return_amount || 0)}
        />
      </Accordion>

      {/* single gate pass */}
      {gatePassData &&
        gatePassData.map((item: any, index) => (
          <Accordion
            key={index}
            name={`Gate pass no. - ${gatePasses[index].gate_pass_no}`}
          >
            <GatePassTable
              key={index}
              totalAmount={Number(gatePasses[index].total_net_val)}
              totalInvoice={Number(item[0].total_invoice || 0)}
              cashCollection={Number(item[0].total_collection || 0)}
              cashCollectionAmount={Number(item[0].collection_amount || 0)}
              totalDelivered={Number(item[0].total_delivered || 0)}
              totalDeliveredAmount={
                Number(item[0].total_due || 0) +
                Number(item[0].collection_amount || 0)
              }
              deliveryRemaining={
                Number(item[0].total_invoice || 0) -
                Number(item[0].total_delivered || 0)
              }
              deliveryRemainingAmount={
                Number(gatePasses[index].total_net_val) -
                Number(item[0].total_due || 0) -
                Number(item[0].return_amount || 0)
              }
              returnAmount={Number(item[0].return_amount || 0)}
              totalReturn={Number(item[0].total_return || 0)}
              cashCollectionRemaining={
                Number(item[0].total_delivered || 0) -
                Number(item[0].total_collection || 0)
              }
              cashCollectionRemainingAmount={Number(item[0].total_due || 0)}
            />
          </Accordion>
        ))}
    </section>
  );
}

export default GatePassSummaryPage;
