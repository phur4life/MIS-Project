import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getSession({ req });
  const { pathname } = req.nextUrl;

  // Define the protected routes based on roles
  const adminRoutes = ["/admin"];
  const memberRoutes = ["/member"];
  const userRoutes = ["/user"];

  // Check if the user is authenticated
  if (!session) {
    // Redirect to sign-up if not authenticated (instead of sign-in)
    return NextResponse.redirect("/");
  }

  // Restrict access based on user role and requested route
  const userRole = session.user.role;

  if (userRole === "admin" && !adminRoutes.includes(pathname)) {
    // Redirect if admin tries to access non-admin route
    return NextResponse.redirect("/unauthorized");
  }

  if (userRole === "member" && !memberRoutes.includes(pathname)) {
    // Redirect if member tries to access non-member route
    return NextResponse.redirect("/unauthorized");
  }

  if (userRole === "user" && !userRoutes.includes(pathname)) {
    // Redirect if user tries to access non-user route
    return NextResponse.redirect("/unauthorized");
  }

  // Allow the request to continue if the checks pass
  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: ["/admin/:path*", "/member/:path*", "/user/:path*"],
};
