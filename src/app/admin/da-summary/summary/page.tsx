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
  const { gatepassWiseData } = await getGatePassBill(searchParams);

  return (
    <>
      {/* overview */}
      <Accordion show={true} name="Overview">
        {gatepassWiseData ? (
          <GatePassTable
            totalAmount={getTotal(gatepassWiseData, "total_amount")}
            totalInvoice={getTotal(gatepassWiseData, "total_invoice")}
            cashCollection={
              getTotal(gatepassWiseData, "total_collection") -
              getTotal(gatepassWiseData, "total_due")
            }
            cashCollectionAmount={
              getTotal(gatepassWiseData, "collection_amount") -
              getTotal(gatepassWiseData, "total_due_amount") -
              getTotal(gatepassWiseData, "return_amount")
            }
            totalDelivered={getTotal(gatepassWiseData, "total_delivered")}
            totalDeliveredAmount={
              getTotal(gatepassWiseData, "total_delivered_done_amount") -
              getTotal(gatepassWiseData, "return_amount")
            }
            deliveryRemaining={
              getTotal(gatepassWiseData, "total_invoice") -
              getTotal(gatepassWiseData, "total_delivered")
            }
            deliveryRemainingAmount={
              getTotal(gatepassWiseData, "total_amount") -
              getTotal(gatepassWiseData, "total_delivered_done_amount")
            }
            returnAmount={getTotal(gatepassWiseData, "return_amount")}
            totalReturn={getTotal(gatepassWiseData, "total_return")}
            cashCollectionRemaining={getTotal(
              gatepassWiseData,
              "total_collection_remaining"
            )}
            cashCollectionRemainingAmount={getTotal(
              gatepassWiseData,
              "total_collection_remaining_amount"
            )}
            totalCredit={getTotal(gatepassWiseData, "total_credit")}
            totalCreditAmount={getTotal(
              gatepassWiseData,
              "total_credit_amount"
            )}
            totalCreditDelivered={
              getTotal(gatepassWiseData, "total_delivered") -
              getTotal(gatepassWiseData, "total_collection") -
              getTotal(gatepassWiseData, "total_collection_remaining")
            }
            totalCreditDeliveredAmount={
              getTotal(gatepassWiseData, "total_delivered_done_amount") -
              getTotal(gatepassWiseData, "collection_amount") -
              getTotal(gatepassWiseData, "total_collection_remaining_amount")
            }
            totalDue={getTotal(gatepassWiseData, "total_due")}
            totalDueAmount={getTotal(gatepassWiseData, "total_due_amount")}
          />
        ) : (
          <div className="my-12">
            <NoData />
          </div>
        )}
      </Accordion>

      {/* single gate pass */}
      {gatepassWiseData &&
        gatepassWiseData.map((item: any, index: number) => (
          <Accordion key={index} name={`Gate pass no. - ${item.gate_pass_no}`}>
            <GatePassTable
              key={index}
              totalAmount={Number(item.total_amount)}
              totalInvoice={Number(item.total_invoice || 0)}
              cashCollection={
                Number(item.total_collection || 0) - Number(item.total_due || 0)
              }
              cashCollectionAmount={
                Number(item.collection_amount || 0) -
                Number(item.total_due_amount || 0) -
                Number(item.return_amount || 0)
              }
              totalDelivered={Number(item.total_delivered || 0)}
              totalDeliveredAmount={
                Number(item.total_delivered_done_amount || 0) -
                Number(item.return_amount || 0)
              }
              deliveryRemaining={
                Number(item.total_invoice || 0) -
                Number(item.total_delivered || 0)
              }
              deliveryRemainingAmount={
                Number(item.total_amount) -
                Number(item.total_delivered_done_amount || 0)
              }
              returnAmount={Number(item.return_amount || 0)}
              totalReturn={Number(item.total_return || 0)}
              cashCollectionRemaining={Number(
                item.total_collection_remaining || 0
              )}
              cashCollectionRemainingAmount={Number(
                item.total_collection_remaining_amount || 0
              )}
              totalCredit={Number(item.total_credit || 0)}
              totalCreditAmount={Number(item.total_credit_amount || 0)}
              totalCreditDelivered={
                Number(item.total_delivered || 0) -
                Number(item.total_collection || 0) -
                Number(item.total_collection_remaining || 0)
              }
              totalCreditDeliveredAmount={
                Number(item.total_delivered_done_amount || 0) -
                Number(item.collection_amount || 0) -
                Number(item.total_collection_remaining_amount || 0)
              }
              totalDue={Number(item.total_due || 0)}
              totalDueAmount={Number(item.total_due_amount || 0)}
            />
          </Accordion>
        ))}
    </>
  );
}

const getTotal = (data: any[], key: string) => {
  return data.reduce((sum, obj) => sum + Number(obj[key] || 0), 0);
};
