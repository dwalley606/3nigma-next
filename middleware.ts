import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createClient(request);
  const { data: { session } } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Redirect to login if no session and accessing a protected route
  if (!session && pathname.startsWith('/dashboard') && pathname !== '/dashboard/login' && pathname !== '/dashboard/signup') {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  // Redirect to dashboard if logged in and accessing login/signup
  if (session && (pathname === '/dashboard/login' || pathname === '/dashboard/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};