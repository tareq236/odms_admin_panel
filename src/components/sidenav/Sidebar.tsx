"use client";

import { format } from "date-fns";
import { Home, ListTodo, Map, Route, Truck, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="md:p-5">
      <div className="top min-h-[20rem] flex flex-col gap-8">
        {/* logo */}
        <div className="logo px-2 text-primary">
          <Map className="size-7" />
        </div>

        {/* links */}
        <div className="flex flex-col gap-2">
          <NavLink
            icon={<Home className="size-4" />}
            name="Dashboard"
            href="/admin"
            onClick={onClose}
          />
          <NavLink
            icon={<UserRoundPen className="size-4" />}
            name="User Management"
            href="/admin/user/management"
            onClick={onClose}
          />
          <NavLink
            icon={<ListTodo className="size-4" />}
            name="Attendance"
            href={`/admin/user/attendance?start=${format(
              new Date(),
              "yyyy-MM-dd",
            )}`}
            onClick={onClose}
          />
          <NavLink
            icon={<Route className="size-4" />}
            name="Route"
            href="/admin/route"
            onClick={onClose}
          />
          <NavLink
            icon={<Truck className="size-4" />}
            name="Delivery"
            href="/admin/delivery"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="bottom min-h-[10rem]"></div>
    </div>
  );
}

const NavLink = ({
  icon,
  name,
  href,
  onClick,
}: {
  icon: ReactNode;
  name: string;
  href: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={`${
          href.split("?")[0] === pathname && "text-primary bg-primary/5"
        } text-sm flex gap-3 items-center p-2 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300`}
        href={href}
        onClick={onClick}
      >
        {icon}
        <span>{name}</span>
      </Link>
    </>
  );
};
