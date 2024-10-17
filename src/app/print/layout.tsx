import React from "react";
import "./print.css";

export default async function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <div className="container">{children}</div>
    </div>
  );
}
