import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);

  if (url.hostname === "mail.neighborhoodhomes.ng") {
    return NextResponse.redirect("https://mail.zoho.com");
  }

  return NextResponse.next();
}