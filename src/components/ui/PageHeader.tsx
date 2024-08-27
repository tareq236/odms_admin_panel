import React from "react";

function PageHeader({icon, title}: {icon: React.ReactNode, title: string}) {
  return (
    <div className="header flex gap-2 items-center">
      <div className="icon rounded-full text-primary">
        {icon}
      </div>
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}

export default PageHeader;
