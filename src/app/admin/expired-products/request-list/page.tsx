import FilterSection from "@/components/expired-products/FilterSection";
import RequestListTable from "@/components/expired-products/request-list/RequestListTable";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import { ScrollText } from "lucide-react";
import React, { Suspense } from "react";
import { getRequestList } from "../_actions/request-list";
import NoData from "@/components/constants/NoData";
import { SearchParams } from "@/types/params";

export default function ExpiredProductsListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <PageHeader
        title="Request List"
        icon={<ScrollText className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      <Suspense>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const DataTable = async ({ searchParams }: { searchParams: SearchParams }) => {
  const res = await getRequestList({ searchParams });

  return (
    <section className="data-table-section">
      <RequestListTable data={res.data} error={undefined} />
      {res.data.length === 0 && <NoData />}
      <PagePagination limit={1} count={1} />
    </section>
  );
};
