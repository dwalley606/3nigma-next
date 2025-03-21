"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/utils/supabase/client';

interface Conversation {
  id: string;
  name: string;
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
        .from('conversations')
        .select('id, name, last_message_id, created_at');
      if (error) {
        console.error('Error fetching conversations:', error.message);
      } else {
        setConversations(data || []);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link href={`/dashboard/conversations/${conversation.id}`}>
              {conversation.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}