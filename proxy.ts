


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public routes (no login required)
const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/privacy",
  "/terms",
];

// Routes that should NOT be redirected (static files, api, etc.)
const ignoredPaths = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/images",
  "/icons",
  "/static",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow static files, API routes, Next.js internals
  if (ignoredPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2. Get accessToken from cookies (httpOnly or not)
  const accessToken = request.cookies.get("accessToken")?.value;

  const isPublicRoute = publicRoutes.includes(pathname) || pathname === "/";

  // 3. If user HAS token → allow access to protected pages
  if (accessToken) {
    // Optional: If trying to access login/register while logged in → redirect to home
    if (isPublicRoute && (pathname === "/login" || pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 4. NO token → block protected pages
  if (!isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    // Optional: Save where they were trying to go
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Public route + no token → allow
  return NextResponse.next();
}

// Apply middleware to all routes except static/api
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
};