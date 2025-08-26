"use client";

import {
  Footprints,
  Home,
  IdCard,
  List,
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
import { rdl_admin_user_list_role } from "@/prisma/generated/client1";
import Spinner from "../ui/Spinner";
import { FileUser } from "../constants/icons/icons";
import Link from "next/link";
import { titleCase } from "@/lib/formatters";

const Navlist = {
  admin: {
    main: [
      { icon: Home, name: "Dashboard", href: "/admin" },
      {
        icon: UserRoundPen,
        name: "User Management",
        href: "/admin/user/management",
      },
      { icon: ListTodo, name: "Attendance", href: "/admin/user/attendance" },
      { icon: Route, name: "Route", href: "/admin/route" },
      {
        icon: Truck,
        name: "Delivery",
        children: [
          {
            icon: ScrollText,
            name: "Invoice",
            href: "/admin/delivery/invoice",
          },
          {
            icon: PackageCheck,
            name: "Collection",
            href: "/admin/delivery/collection",
          },
        ],
      },
      { icon: IdCard, name: "DA Summary", href: "/admin/da-summary" },
    ],
    map: [
      {
        icon: Waypoints,
        name: "Transportation",
        href: "/admin/map/transportation",
      },
      {
        icon: MapPin,
        name: "DA Tracking",
        href: "/admin/map/da-tracking",
      },
      {
        icon: Footprints,
        name: "Live Tracking",
        href: "/admin/map/live-tracking",
      },
      {
        icon: MapPinned,
        name: "DA Movement",
        href: "/admin/map/da-movement",
      },
    ],
    analytics: [
      {
        icon: FileUser,
        name: "DA Movement Info",
        href: "/admin/map/da-movement-info",
      },
      {
        icon: Users,
        name: "Partner Delivery",
        href: "/admin/map/partner-delivery",
      },
    ],
    expired_product: [
      {
        icon: ScrollText,
        name: "Withdrawal Request",
        href: "/admin/expired-products/withdrawal-request",
      },
      {
        icon: List,
        name: "Replacement Order",
        href: "/admin/expired-products/replacement-order",
      },
    ],
  },
  admin_odms: {
    main: [
      { icon: Home, name: "Dashboard", href: "/admin" },
      {
        icon: UserRoundPen,
        name: "User Management",
        href: "/admin/user/management",
      },
      { icon: ListTodo, name: "Attendance", href: "/admin/user/attendance" },
      { icon: Route, name: "Route", href: "/admin/route" },
      {
        icon: Truck,
        name: "Delivery",
        children: [
          {
            icon: ScrollText,
            name: "Invoice",
            href: "/admin/delivery/invoice",
          },
          {
            icon: PackageCheck,
            name: "Collection",
            href: "/admin/delivery/collection",
          },
        ],
      },
      { icon: IdCard, name: "DA Summary", href: "/admin/da-summary" },
    ],
    map: [
      {
        icon: Waypoints,
        name: "Transportation",
        href: "/admin/map/transportation",
      },
      {
        icon: MapPin,
        name: "DA Tracking",
        href: "/admin/map/da-tracking",
      },
      {
        icon: Footprints,
        name: "Live Tracking",
        href: "/admin/map/live-tracking",
      },
      {
        icon: MapPinned,
        name: "DA Movement",
        href: "/admin/map/da-movement",
      },
    ],
    analytics: [
      {
        icon: FileUser,
        name: "DA Movement Info",
        href: "/admin/map/da-movement-info",
      },
      {
        icon: Users,
        name: "Partner Delivery",
        href: "/admin/map/partner-delivery",
      },
    ],
  },
  admin_expr: {
    main: [
      {
        icon: ScrollText,
        name: "Withdrawal Request",
        href: "/admin/expired-products/withdrawal-request",
      },
      {
        icon: List,
        name: "Replacement Order",
        href: "/admin/expired-products/replacement-order",
      },
    ],
  },
  depot: {
    main: [
      { icon: Home, name: "Dashboard", href: "/admin" },
      { icon: ListTodo, name: "Attendance", href: "/admin/user/attendance" },
      { icon: Route, name: "Route", href: "/admin/route" },
      {
        icon: Truck,
        name: "Delivery",
        children: [
          {
            icon: ScrollText,
            name: "Invoice",
            href: "/admin/delivery/invoice",
          },
          {
            icon: PackageCheck,
            name: "Collection",
            href: "/admin/delivery/collection",
          },
        ],
      },
      { icon: IdCard, name: "DA Summary", href: "/admin/da-summary" },
    ],
    map: [
      {
        icon: Waypoints,
        name: "Transportation",
        href: "/admin/map/transportation",
      },
      {
        icon: MapPin,
        name: "DA Tracking",
        href: "/admin/map/da-tracking",
      },
      {
        icon: Footprints,
        name: "Live Tracking",
        href: "/admin/map/live-tracking",
      },
      {
        icon: MapPinned,
        name: "DA Movement",
        href: "/admin/map/da-movement",
      },
    ],
    analytics: [
      {
        icon: FileUser,
        name: "DA Movement Info",
        href: "/admin/map/da-movement-info",
      },
    ],
    expired: [
      {
        icon: ScrollText,
        name: "Withdrawal Request",
        href: "/admin/expired-products/withdrawal-request",
      },
      {
        icon: List,
        name: "Replacement Order",
        href: "/admin/expired-products/replacement-order",
      },
    ],
  },
};

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
    <div className="max-h-[calc(100dvh-1rem)] flex flex-col justify-between min-h-svh">
      <div className="top md:pt-5 min-h-[20rem] flex flex-col md:gap-5">
        {/* logo */}
        <Link
          href={"/"}
          className="logo text-primary p-5 md:px-5 md:py-0 flex items-center gap-2"
        >
          <Map className="size-7" />
          <div className="">
            <h1 className="font-title tracking-[1rem] text-lg">ODMS</h1>
            <h2 className="text-[10px] -mt-1 text-muted-foreground">
              Radiant Distributions
            </h2>
          </div>
        </Link>
        <ScrollArea className="h-[calc(100dvh-2rem)] md:h-[calc(100dvh-2rem)] px-5 md:px-5 md:py-0">
          {/* links */}
          <div className="flex flex-col gap-5">
            {Object.entries(Navlist[userRole]).map(([section, items]) => (
              <div key={section}>
                <h4 className="text-muted-foreground text-xs mb-3">
                  {titleCase(section)}
                </h4>
                {/* main */}
                <div className="flex flex-col gap-2">
                  {items.map((item: any, index) => {
                    if (item?.children)
                      return (
                        <Accordion
                          key={index}
                          name={item.name}
                          icon={<item.icon className="size-4" />}
                        >
                          {item.children.map((child: any) => (
                            <NavLink
                              key={child.href}
                              icon={<child.icon className="size-4" />}
                              name={child.name}
                              href={child.href}
                              onClick={onClose}
                            />
                          ))}
                        </Accordion>
                      );
                    return (
                      <NavLink
                        key={index}
                        icon={<item.icon className="size-4" />}
                        name={item.name}
                        href={item.href}
                        onClick={onClose}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="bottom my-3 md:my-6 px-5 md:px-5 md:py-0">
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
    </div>
  );
}
