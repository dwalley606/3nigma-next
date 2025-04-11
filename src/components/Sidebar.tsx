'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ConversationList from './ConversationList';

export default function Sidebar({ userId }: { userId: string }) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function fetchConversations() {
      if (!userId) {
        console.log('No userId provided, skipping fetch');
        if (isMounted) setLoading(false);
        return;
      }

      console.log('Fetching conversations for user:', userId);
      
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);

      console.log('Conversation IDs fetched:', participantData, 'Error:', participantError);
      if (participantError || !isMounted) {
        if (participantError) console.error('Error fetching conversation IDs:', participantError.message);
        setLoading(false);
        return;
      }

      if (!participantData || participantData.length === 0) {
        console.log('No conversations found for user');
        if (isMounted) setConversations([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('id, name, last_message_id, created_at, updated_at')
        .in('id', participantData.map(p => p.conversation_id))
        .order('updated_at', { ascending: false });

      console.log('Conversations fetch result:', data, 'Error:', error);
      if (error || !isMounted) {
        if (error) console.error('Error fetching conversations:', error.message);
        setLoading(false);
        return;
      }

      if (isMounted) setConversations(data || []);
      setLoading(false);
    }

    fetchConversations();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth?mode=login');
  };

  if (loading) return <div className="text-gray-900">Loading...</div>;

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 flex-1 overflow-y-auto">
        <ConversationList conversations={conversations} />
      </div>
      <button
        onClick={handleLogout}
        className="m-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}