// src/app/dashboard/contacts/[userId]/page.tsx
import { createClient } from '@/utils/supabase/server'
import ContactsSection from '@/components/ContactsSection'

interface Contact {
  id: string
  username: string
  email: string
}

interface ContactRequest {
  id: string
  from_user_id: string
  status: 'pending' | 'accepted' | 'rejected'
  users: { username: string }
}

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = await params

  if (!userId || userId === 'undefined') {
    return <div className="p-4 text-red-400">Invalid user ID. Please log in.</div>
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log('Authenticated user:', user)

  if (!user || user.id !== userId) {
    return <div className="p-4 text-red-400">Please log in with the correct user.</div>
  }

  console.log('Fetching contacts for userId:', userId)
  const { data: contactsData, error: contactsError } = await supabase
    .from('contacts')
    .select('users!contact_id(id, username, email)')
    .eq('user_id', userId)

  console.log('Raw Contacts Data:', contactsData)

  const { data: requestsData, error: requestsError } = await supabase
    .from('contact_requests')
    .select('id, from_user_id, status, users!from_user_id(username)')
    .eq('to_user_id', userId)
    .eq('status', 'pending')

  console.log('Raw Requests Data:', requestsData)

  if (contactsError || requestsError) {
    console.error('Fetch error:', contactsError || requestsError)
    return <div className="text-red-400">Error loading contacts: {contactsError?.message || requestsError?.message}</div>
  }

  const contacts = contactsData?.map((c) => c.users) || []

  return (
    <div className="p-4">
      <ContactsSection
        contacts={contacts}
        pendingRequests={requestsData || []}
        userId={userId}
      />
    </div>
  )
}