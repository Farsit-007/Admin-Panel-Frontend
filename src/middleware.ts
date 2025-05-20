import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

const publicRoutes = ["/"]; // Add other public routes if needed

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // Check if current route is public
  if (publicRoutes.includes(pathname)) {
    // Redirect logged-in users from public routes to dashboard
    if (userInfo) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Allow unauthenticated access to public routes
    return NextResponse.next();
  }

  // Protect non-public routes
  if (!userInfo) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_|login|public).*)"],
};