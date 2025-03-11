import { createClient } from '@supabase/supabase-js';
import ContactsSection from '@/app/components/contacts/ContactsSection';

export interface Contact {
  id: string;
  username: string;
  email: string;
}

export interface ContactRequest {
  id: string;
  from_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default async function Page({ params }: { params: { userId: string } }) {
  // Await params to access userId
  const { userId } = await params;

  // Validate userId
  if (!userId || userId === 'undefined') {
    return <div className="p-4 text-red-400">Invalid user ID. Please log in.</div>;
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  // Fetch contacts (join with users via contact_id)
  const { data: contactsData, error: contactsError } = await supabase
    .from('contacts')
    .select('users!contact_id(id, username, email)')
    .eq('user_id', userId);

  // Fetch pending requests
  const { data: requestsData, error: requestsError } = await supabase
    .from('contact_requests')
    .select('id, from_user_id, status')
    .eq('to_user_id', userId)
    .eq('status', 'pending');

  console.log('Contacts Data:', contactsData);
  console.log('Requests Data:', requestsData);

  if (contactsError || requestsError) {
    console.error('Fetch error:', contactsError || requestsError);
    return <div className="text-red-400">Error loading contacts: {contactsError?.message || requestsError?.message}</div>;
  }

  const contacts = contactsData?.map((c) => ({
    id: c.users[0].id,
    username: c.users[0].username,
    email: c.users[0].email
  })) || [];

  return (
    <div className="p-4">
      <ContactsSection
        contacts={contacts}
        pendingRequests={requestsData || []}
        userId={userId}
      />
    </div>
  );
}