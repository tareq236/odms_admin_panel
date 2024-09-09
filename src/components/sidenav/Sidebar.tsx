"use client";

import { format } from "date-fns";
import {
  Home,
  ListTodo,
  Map,
  Route,
  Truck,
  UserRoundPen,
} from "lucide-react";
import NavLink from "./NavLink";
import Accordion from "./Accordion";

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

          <Accordion name="Delivery" icon={<Truck className="size-4" />}>
            <NavLink name="Invoice" href="/admin/delivery/invoice" onClick={onClose} />
            <NavLink name="Collection" href="/admin/delivery/collection" onClick={onClose} />
          </Accordion>
        </div>
      </div>
    </div>
  );
}
