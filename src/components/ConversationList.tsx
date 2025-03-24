// src/components/ConversationList.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/utils/supabase/client';

interface Conversation {
  id: string;
  name: string | null;
  last_message_id?: string;
  created_at: string;
}

interface ConversationListProps {
  userId: string;
}

export default function ConversationList({ userId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('conversation_participants')
        .select('conversation_id, conversations (id, name, last_message_id, created_at)')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching conversations:', error.message);
      } else {
        const convoData = data?.map((p: any) => p.conversations) || [];
        setConversations(convoData);
      }
    };

    fetchConversations();

    // Real-time subscription
    const subscription = supabase
      .channel('convo_participants')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversation_participants', filter: `user_id=eq.${userId}` }, () =>
        fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link href={`/dashboard?convo=${conversation.id}`} className="block py-1 px-2 hover:bg-gray-600 rounded">
              {conversation.name || 'Unnamed Chat'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}