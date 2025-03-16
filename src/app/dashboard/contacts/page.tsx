// src/app/dashboard/contacts/page.tsx
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ContactsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/dashboard/login')
  }

  redirect(`/dashboard/contacts/${user.id}`)
}