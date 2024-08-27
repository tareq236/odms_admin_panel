import PageHeader from "@/components/ui/PageHeader";
import FilterSection from "@/components/user/management/FilterSection";
import { UserPen } from "lucide-react";
import React from "react";

export default async function UserManagementPage() {
  return (
    <>
      <PageHeader
        icon={<UserPen className="size-5" />}
        title="User Management"
      />
      <FilterSection />

      
    </>
  );
}
