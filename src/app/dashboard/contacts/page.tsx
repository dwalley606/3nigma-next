// src/app/dashboard/contacts/page.tsx
import { supabaseServer } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation'

export default async function ContactsPage() {
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (!user) {
    redirect('/dashboard/login')
  }

  redirect(`/dashboard/contacts/${user.id}`)
}