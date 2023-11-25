import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
    if (
      (req.nextUrl.pathname.startsWith("/checkout") ||
        req.nextUrl.pathname.startsWith("/account")) &&
      req.nextauth.token?.verified !== true
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:anything*", "/checkout/:anything*", "/account/:anything*"],
};
