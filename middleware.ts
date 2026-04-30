import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");

  if (hostname === "mail.neighborhoodhomes.ng") {
    return NextResponse.redirect("https://mail.zoho.com");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};