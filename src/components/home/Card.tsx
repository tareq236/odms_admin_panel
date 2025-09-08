import Link from "next/link";
import React from "react";

function Card({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
      <Link href={href} className="flex items-center gap-3 grow cursor-pointer bg-background px-5 py-3 hover:bg-primary/90 transition-all duration-200 group border rounded-lg flex-1">
        {/* icon */}
        <div className="icon  p-2 w-fit rounded text-primary group-hover:text-background">{icon}</div>

        {/* title */}
        <h4 className=" group-hover:text-background">{title}</h4>
      </Link>
  );
}

export default Card;
