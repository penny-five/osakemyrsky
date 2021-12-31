import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth/")) {
    return NextResponse.rewrite(`${process.env.API_URL}${pathname}`);
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.rewrite(`${process.env.API_URL}/${pathname.substring("/api/".length)}`);
  }
}
