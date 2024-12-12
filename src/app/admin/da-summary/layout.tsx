import FilterSection from "@/components/da-summary/FilterSection";
import TabSection from "@/components/da-summary/TabSection";
import PageHeader from "@/components/ui/PageHeader";
import { IdCard } from "lucide-react";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DA Summary - ODMS Admin Panel",
};

function DaSummaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader
        title="DA Summary"
        icon={<IdCard className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      <TabSection />

      <section className="my-6">{children}</section>
    </>
  );
}

export default DaSummaryLayout;
