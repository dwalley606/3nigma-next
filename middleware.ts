// middleware.ts
import { type NextRequest } from 'next/server'
import { middleware } from './src/app/utils/supabase/middleware'

export { middleware }

export const config = {
  matcher: ['/dashboard/:path*']
}