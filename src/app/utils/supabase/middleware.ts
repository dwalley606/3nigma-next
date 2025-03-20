import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from './database.types';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Redirect unauthenticated users to login (except on login/signup pages)
  if (!user && !request.nextUrl.pathname.startsWith('/dashboard/login') && !request.nextUrl.pathname.startsWith('/dashboard/signup')) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Protect all dashboard routes
    '/((?!_next/static|_next/image|favicon.ico).*)', // Exclude static assets
  ],
};