import React from "react";
import "./print.css";

export default async function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <main className="container">{children}</main>
    </div>
  );
}
