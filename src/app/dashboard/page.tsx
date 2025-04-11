'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import ConversationList from '@/components/ConversationList';
import { supabase } from '@/utils/supabase/client';

export default function Dashboard() {
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversation');
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/auth?mode=login');
      return;
    }

    async function fetchConversations() {
      if (!session) return;

      const userId = session.user.id;
      console.log('Fetching conversations for user:', userId);
      
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);

      console.log('Conversation IDs fetched:', participantData, 'Error:', participantError);
      if (participantError) {
        console.error('Error fetching conversation IDs:', participantError.message);
        setLoading(false);
        return;
      }

      if (!participantData || participantData.length === 0) {
        console.log('No conversations found for user');
        setConversations([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('id, name, last_message_id, created_at, updated_at')
        .in('id', participantData.map(p => p.conversation_id));

      console.log('Conversations fetch result:', data, 'Error:', error);
      if (error) {
        console.error('Error fetching conversations:', error.message);
        setLoading(false);
        return;
      }

      setConversations(data || []);
      setLoading(false);
    }

    fetchConversations();
  }, [authLoading, session, router]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (!session) return null;

  return (
    <>
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {conversationId ? (
          <ChatWindow conversationId={conversationId} userId={session.user.id} />
        ) : (
          <ConversationList conversations={conversations} />
        )}
      </div>
    </>
  );
}