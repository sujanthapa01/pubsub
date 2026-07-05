import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export function proxy(request: NextRequest) {
  console.log("Middleware running");
  console.log("Path:", request.nextUrl.pathname);

  const token = request.cookies.get("access_token")?.value;

  console.log("Token:", token);

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  console.log("Protected:", isProtected);

  if (isProtected && !token) {
    console.log("Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};