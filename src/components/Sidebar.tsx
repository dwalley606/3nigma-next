'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

interface SidebarProps {
  userId: string;
}

export default function Sidebar({ userId }: SidebarProps) {
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      if (!userId) {
        setLoading(false);
        return;
      }

      console.log('Fetching contacts for user:', userId);
      
      // Step 1: Fetch contact IDs
      const { data: contactIds, error: contactsError } = await supabase
        .from('contacts')
        .select('contact_id')
        .eq('user_id', userId);

      if (contactsError) {
        console.error('Error fetching contact IDs:', contactsError.message);
        setLoading(false);
        return;
      }

      if (!contactIds || contactIds.length === 0) {
        console.log('No contacts found for user');
        setContacts([]);
        setLoading(false);
        return;
      }

      // Step 2: Fetch user profiles for those contact IDs
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, username, email, profile_pic_url')
        .in('id', contactIds.map(c => c.contact_id));

      console.log('User profiles fetch result:', data, 'Error:', error);
      if (error) {
        console.error('Error fetching user profiles:', error.message);
      } else {
        setContacts(data || []);
      }
      setLoading(false);
    }

    fetchContacts();
  }, [userId]);

  const startConversation = async (contactId: string) => {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contactId }),
    });
    const { conversationId } = await res.json();
    router.push(`/dashboard?convo=${conversationId}`);
  };

  if (loading) return <div>Loading contacts...</div>;

  return (
    <div className="h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => startConversation(contact.id)}
          >
            {contact.username} ({contact.email})
          </li>
        ))}
      </ul>
    </div>
  );
}