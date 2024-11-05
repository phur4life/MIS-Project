import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const session = await getSession({ req });
  const { pathname } = req.nextUrl;

  // Define protected routes based on roles
  const adminRoutes = ['/admin'];
  const memberRoutes = ['/member'];
  const userRoutes = ['/user'];

  if (!session) {
    return NextResponse.redirect('/api/auth/signin'); // Redirect to sign-in if not authenticated
  }

  if (session.user.role === 'admin' && !adminRoutes.includes(pathname)) {
    return NextResponse.redirect('/unauthorized'); // Redirect if admin tries to access non-admin route
  }

  if (session.user.role === 'member' && !memberRoutes.includes(pathname)) {
    return NextResponse.redirect('/unauthorized'); // Redirect if member tries to access non-member route
  }

  if (session.user.role === 'user' && !userRoutes.includes(pathname)) {
    return NextResponse.redirect('/unauthorized'); // Redirect if user tries to access non-user route
  }
  return NextResponse.next(); // Allow access if all checks pass
}

export const config = {
    matcher: ['/admin/:path*', '/member/:path*', '/user/:path*'], // Define which paths this middleware applies to
  };
