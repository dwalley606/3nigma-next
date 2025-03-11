'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ContactsRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectToUserContacts = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const userId = session.user.id;
      router.push(`/contacts/${userId}`);
    };

    redirectToUserContacts();
  }, [router]);

  return <div className="p-4 text-gray-100">Redirecting to your contacts...</div>;
}