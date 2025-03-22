import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

async function createClient(request: NextRequest) {
  const response = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  return { supabase, response };
}

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