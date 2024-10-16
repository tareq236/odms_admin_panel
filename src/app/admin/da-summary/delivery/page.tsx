import SearchDa from "@/components/constants/SearchDa";
import CardSection from "@/components/delivery/collection/CardSection";
import CollectionDetailsView from "@/components/delivery/collection/CollectionDetailsView";
import DeliveryCollectionTable from "@/components/delivery/collection/DeliveryCollectionTable";
import PagePagination from "@/components/ui/PagePagination";
import React, { Suspense } from "react";
import { getDeliveryCollection } from "../../delivery/collection/_action/action";
import TableSkeleton from "@/components/ui/TableSkeletion";

export default function DaDeliveryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string, dId:string, status: string };
}) {
  return (
    <>
      {searchParams.q ? (
        <>
          <Suspense>
            <CardSection searchParams={searchParams} />
          </Suspense>

          {/* table section */}
          <Suspense fallback={<TableSkeleton />}>
            <DataTable searchParams={searchParams} />
          </Suspense>
        </>
      ) : (
        <SearchDa />
      )}
    </>
  );
}

const DataTable = async ({
  searchParams,
}: {
  searchParams: {
    p: string;
    q: string;
    start: string;
    dId: string;
    status: string;
  };
}) => {
  const limit = 20;

  const { data, count, connectionError } = await getDeliveryCollection({
    searchParams: searchParams,
    limit: limit,
    connectionError: false,
  });

  return (
    <>
      <div className="data-table-section my-6">
        <DeliveryCollectionTable
          data={data as any[]}
          connectionError={connectionError}
        >
          {searchParams.dId && (
            <Suspense fallback={<p>Loading...</p>}>
              {/* anc */}
              <CollectionDetailsView searchParams={searchParams} />
            </Suspense>
          )}
        </DeliveryCollectionTable>
        <PagePagination limit={limit} count={Number(count[0]?.total || 0)} />
      </div>
    </>
  );
};
