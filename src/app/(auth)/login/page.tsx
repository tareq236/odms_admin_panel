import LoginForm from "@/components/login/LoginForm";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId) {
    redirect("/admin");
  }
  
  return (
    <>
      <LoginForm />
    </>
  );
}

