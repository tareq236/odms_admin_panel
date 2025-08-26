import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import {
  expiredPanelAdminPermission,
  odmsPanelAdminPermission,
} from "./lib/permissions";
import { AuthUser } from "./types/AuthUser";

const protectedRoutes = [
  "/admin/user/management",
  "/admin/analytics/partner-delivery",
];

const odmsPanelRoutes = [
  "/admin/user/management",
  "/admin/user/attendance",
  "/admin/route",
  "/admin/delivery/invoice",
  "/admin/delivery/collection",
  "/admin/da-summary",
  "/admin/da-summary/summary",
  "/admin/da-summary/returns",
  "/admin/da-summary/due",
  "/admin/map/transportation",
  "/admin/map/transportation",
  "/admin/map/da-tracking",
  "/admin/map/da-movement",
  "/admin/map/live-tracking",
  "/admin/analytics/partner-delivery",
  "/admin/analytics/da-movement-info",
];

const exprPanelRoutes = [
  "/admin/expired-products/withdrawal-request",
  "/admin/expired-products/replacement-order",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isODMSProtectedRoute = odmsPanelRoutes.includes(path);
  const isExprPanelRoutes = exprPanelRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to /login if the user is not authenticated
  if (!session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const userRole = session.role;

  // depot authorization
  if (isProtectedRoute && userRole == "depot") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  console.log(userRole);

  if (userRole !== "depot") {
    // odms authorization
    if (
      isODMSProtectedRoute &&
      !odmsPanelAdminPermission(session as AuthUser)
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // expired panel authorization
    if (
      isExprPanelRoutes &&
      !expiredPanelAdminPermission(session as AuthUser)
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/admin/:path*", "/print/:path*", "/api/:path*"],
};
