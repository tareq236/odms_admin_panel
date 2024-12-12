import LoginForm from "@/components/login/LoginForm";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ODMS Admin Panel",
};

export default async function LoginPage() {
  return <LoginForm />;
}
