import { useState, useEffect } from 'react';
import { supabase } from '@/lib/db';

export function useContacts() {
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
          user_profiles!contacts_contact_id_fkey (username, email, profile_pic_url)
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

  return { contacts, loading };
}