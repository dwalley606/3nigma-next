// src/app/dashboard/contacts/page.tsx
import { createClient } from '../../utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'

interface Contact {
  users: {
    id: string;
    username: string;
    email: string;
  }
}

export default async function ContactsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('users!contact_id(id, username, email)') as { data: Contact[], error: PostgrestError | null }

  if (error) {
    console.error('Error fetching contacts:', error)
    return <div>Error loading contacts</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.users.id}>{contact.users.username}</li>
        ))}
      </ul>
    </div>
  )
}