"use client";

import { format } from "date-fns";
import {
  Footprints,
  Home,
  IdCard,
  ListTodo,
  LogOut,
  Map,
  MapPin,
  MapPinned,
  PackageCheck,
  Route,
  ScrollText,
  Truck,
  UserRoundPen,
  Users,
  Waypoints,
} from "lucide-react";
import NavLink from "./NavLink";
import Accordion from "./Accordion";
import { useTransition } from "react";
import { useRouter } from "next-nprogress-bar";
import { logout } from "@/app/actions/auth";
import { ScrollArea } from "../ui/scroll-area";
import { rdl_admin_user_list_role } from "@prisma/client";
import Spinner from "../ui/Spinner";

export default function Sidebar({
  onClose,
  userRole,
}: {
  onClose?: () => void;
  userRole: rdl_admin_user_list_role;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <ScrollArea className="max-h-[calc(100dvh-1rem)] p-5 md:px-5 md:py-0 flex flex-col justify-between">
      <div className="top md:pt-5 min-h-[20rem] flex flex-col gap-8">
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
          {userRole != "depot" && (
            <NavLink
              icon={<UserRoundPen className="size-4" />}
              name="User Management"
              href="/admin/user/management"
              onClick={onClose}
            />
          )}

          <NavLink
            icon={<ListTodo className="size-4" />}
            name="Attendance"
            href={`/admin/user/attendance?start=${format(
              new Date(),
              "yyyy-MM-dd"
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
            <NavLink
              name="Invoice"
              icon={<ScrollText className="size-4" />}
              href="/admin/delivery/invoice"
              onClick={onClose}
            />
            <NavLink
              name="Collection"
              icon={<PackageCheck className="size-4" />}
              href="/admin/delivery/collection"
              onClick={onClose}
            />
          </Accordion>

          <NavLink
            icon={<IdCard className="size-4" />}
            name="DA Summary"
            href="/admin/da-summary"
            onClick={onClose}
          />

          {/* maps */}
          <div className="mt-3">
            <h4 className="text-muted-foreground text-xs mb-3">Map</h4>

            <div className="flex flex-col gap-2">
              <NavLink
                icon={<Waypoints className="size-4" />}
                name="Conveyance"
                href="/admin/map/conveyance"
                onClick={onClose}
              />

              <NavLink
                icon={<MapPin className="size-4" />}
                name="DA Tracking"
                href="/admin/map/da-tracking"
                onClick={onClose}
              />

              <NavLink
                icon={<Footprints className="size-4" />}
                name="Live Tracking"
                href="/admin/map/live-tracking"
                onClick={onClose}
              />
            </div>
          </div>

          {/* statistics */}
          {userRole != "depot" && (
            <div className="mt-3">
              <h4 className="text-muted-foreground text-xs mb-3">Analytics</h4>

              <div className="flex flex-col gap-2">
                <NavLink
                  icon={<Users className="size-4" />}
                  name="Partner Delivery"
                  href="/admin/analytics/partner-delivery"
                  onClick={onClose}
                />

                <NavLink
                  icon={<MapPinned className="size-4" />}
                  name="DA Movement"
                  href="/admin/analytics/da-movement"
                  onClick={onClose}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bottom mt-6">
        <NavLink
          className="text-destructive hover:bg-red-100 hover:text-red-800"
          icon={
            isPending ? (
              <Spinner borderBottomColor="red-400" />
            ) : (
              <LogOut className="size-4" />
            )
          }
          name={isPending ? "Logging out..." : "Logout"}
          onClick={() => {
            startTransition(async () => {
              await logout();
              router.replace("/login");
            });
          }}
        />
      </div>
    </ScrollArea>
  );
}
