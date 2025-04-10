'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function Sidebar() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          contact_id,
          user_profiles:contact_id (username, email, profile_pic_url)
        `)
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching contacts:', error.message);
      } else {
        setContacts(data || []);
      }
      setLoading(false);
    }

    fetchContacts();
  }, []);

  const startConversation = async (contactId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const userId = session.user.id;
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contactId }),
    });
    const { conversationId } = await res.json();
    window.location.href = `/dashboard?conversation=${conversationId}`;
  };

  if (loading) return <div>Loading contacts...</div>;

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.contact_id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => startConversation(contact.contact_id)}
          >
            {contact.user_profiles.username} ({contact.user_profiles.email})
          </li>
        ))}
      </ul>
    </div>
  );
}