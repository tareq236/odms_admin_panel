import GatePassTable from "@/components/da-summary/summary/GatePassTable";
import React, { Suspense } from "react";
import { getGatePassBill } from "./_actions/action";
import Accordion from "@/components/da-summary/accordion/Accordion";
import SearchDa from "@/components/constants/SearchDa";
import NoData from "@/components/constants/NoData";
import TableSkeleton from "@/components/ui/TableSkeletion";

export default async function GatePassSummaryPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  if (!searchParams.q) return <SearchDa />;

  return (
    <section className="flex flex-col gap-8">
      <Suspense fallback={<TableSkeleton />}>
        <SummaryContainer searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function SummaryContainer({
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
    totalCredit,
    totalDue,
    totalCollectionRemaining,
  } = await getGatePassBill(searchParams);

  return (
    <>
      {/* overview */}
      <Accordion show={true} name="Overview">
        {Number(totalDelivery[0]?.total_net_val || 0) != 0 ? (
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
            cashCollection={Number(
              collectionDone[0]?.total_collection_done || 0
            )}
            cashCollectionAmount={Number(collectionDone[0]?.total_net_val || 0)}
            cashCollectionRemaining={Number(
              totalCollectionRemaining[0]?.total_collection_remaining || 0
            )}
            cashCollectionRemainingAmount={Number(
              totalCollectionRemaining[0]?.total_net_val || 0
            )}
            totalReturn={Number(returnQuantity[0]?.total_return || 0)}
            returnAmount={Number(returnQuantity[0]?.total_return_amount || 0)}
            totalCredit={Number(totalCredit[0]?.total_credit || 0)}
            totalCreditAmount={Number(totalCredit[0]?.total_credit_amount || 0)}
            totalDue={Number(totalDue[0]?.total_due || 0)}
            totalDueAmount={Number(totalDue[0]?.total_due_amount || 0)}
          />
        ) : (
          <div className="my-12">
            <NoData />
          </div>
        )}
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
                Number(item[0].collection_amount || 0) +
                Number(item[0].total_return || 0)
              }
              deliveryRemaining={
                Number(item[0].total_invoice || 0) -
                Number(item[0].total_delivered || 0)
              }
              deliveryRemainingAmount={
                Number(gatePasses[index].total_net_val) -
                Number(item[0].total_due_amount || 0) -
                Number(item[0].return_amount || 0)
              }
              returnAmount={Number(item[0].return_amount || 0)}
              totalReturn={Number(item[0].total_return || 0)}
              cashCollectionRemaining={
                Number(item[0].total_delivered || 0) -
                Number(item[0].total_collection || 0) -
                Number(item[0].total_credit || 0) -
                Number(item[0].total_due || 0)
              }
              cashCollectionRemainingAmount={
                Number(item[0].total_due_amount || 0) -
                Number(item[0].total_credit_amount || 0)
              }
              totalCredit={Number(item[0].total_credit || 0)}
              totalCreditAmount={Number(item[0].total_credit_amount || 0)}
              totalDue={Number(item[0].total_due || 0)}
              totalDueAmount={Number(item[0].total_due_amount || 0)}
            />
          </Accordion>
        ))}
    </>
  );
}
