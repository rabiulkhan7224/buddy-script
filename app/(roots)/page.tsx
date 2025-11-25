// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignore static files, API, _next, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = !!accessToken;

  // 2. Define auth pages (login, signup, etc.)
  const authPaths = ["/login", "/sign-up", "/register", "/signup"];
  const isAuthPath = authPaths.includes(pathname);

  // 3. If user is logged in AND trying to access auth pages → redirect to home
  if (isLoggedIn && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. If user is NOT logged in AND trying to access protected page → go to login
  if (!isLoggedIn && !isAuthPath && pathname !== "/") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. All other cases → allow (public pages, logged in on protected, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};