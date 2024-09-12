import LoginForm from "@/components/login/LoginForm";
import { getUser } from "@/lib/dal";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const user = await getUser()

  if (user != null) {
    redirect("/admin");
  }
  
  return (
    <>
      <LoginForm />
    </>
  );
}

