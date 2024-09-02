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
    <article className="grow cursor-pointer bg-white px-5 py-3 hover:bg-primary/90 transition-all duration-200 group border rounded-lg md:max-w-[16rem]">
      <Link href={href} className="flex items-center gap-3">
        {/* icon */}
        <div className="icon  p-2 w-fit rounded text-primary group-hover:text-white">{icon}</div>

        {/* title */}
        <h4 className=" group-hover:text-white">{title}</h4>
      </Link>
    </article>
  );
}

export default Card;
