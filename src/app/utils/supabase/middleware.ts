import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // If no session and trying to access a protected route, redirect to login
  if (!session && request.nextUrl.pathname.startsWith('/dashboard') && request.nextUrl.pathname !== '/dashboard/login') {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  // If session exists and on login page, redirect to dashboard
  if (session && request.nextUrl.pathname === '/dashboard/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};