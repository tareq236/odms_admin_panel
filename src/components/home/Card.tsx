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
      <Link href={href} className="flex items-center gap-3 grow cursor-pointer bg-white px-5 py-3 hover:bg-primary/90 transition-all duration-200 group border rounded-lg md:max-w-[16rem]">
        {/* icon */}
        <div className="icon  p-2 w-fit rounded text-primary group-hover:text-white">{icon}</div>

        {/* title */}
        <h4 className=" group-hover:text-white">{title}</h4>
      </Link>
  );
}

export default Card;
