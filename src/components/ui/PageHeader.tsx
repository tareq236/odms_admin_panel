import React from "react";

function PageHeader({icon, title}: {icon: React.ReactNode, title: string}) {
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
