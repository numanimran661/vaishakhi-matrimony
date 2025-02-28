import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  // Define protected routes
  const protectedRoutes = ["/home", "/about", "/tell-us-more-about-yourself"];
  
  // Redirect if not logged in
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  matcher: ["/home", "/about", "/tell-us-more-about-yourself"],
};
