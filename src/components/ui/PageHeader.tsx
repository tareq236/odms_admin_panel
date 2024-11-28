"use client"

import { useAuthContext } from "@/contexts/AuthProvider";
import { notFound } from "next/navigation";
import React from "react";

function PageHeader({icon, title}: {icon: React.ReactNode, title: string}) {

  const {auth} = useAuthContext()

  if(auth?.role == "depot") return notFound()

  return (
    <section className="header flex gap-2 items-center">
      <div className="icon rounded-full text-primary">
        {icon}
      </div>
      <h1 className="text-2xl">{title}</h1>
    </section>
  );
}

export default PageHeader;
