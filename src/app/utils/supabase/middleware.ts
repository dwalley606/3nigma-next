import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function createClient(request: NextRequest) {
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
      } as CookieMethodsServer,
    }
  );

  return { supabase, response };
}