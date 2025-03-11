'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ConversationList from '../components/conversations/ConversationList';

interface Conversation {
  id: string;
  name?: string;
  is_group: boolean;
  updated_at: string;
  unread_count: number;
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const userId = session.user.id;
      await fetchConversations(userId);

      const subscription = supabase
        .channel('conversations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'conversation_participants' }, () => {
          fetchConversations(userId);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
        mounted = false;
      };
    };

    const fetchConversations = async (userId: string) => {
      const { data, error } = await supabase
        .from('conversation_participants')
        .select('conversation:conversations(id, name, is_group, updated_at), unread_count')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false, foreignTable: 'conversations' });
      if (error) {
        console.error('Fetch conversations error:', error);
        return;
      }
      if (mounted) {
        setConversations(data?.map(item => ({
          id: item.conversation[0].id,
          name: item.conversation[0].name || undefined,
          is_group: item.conversation[0].is_group,
          updated_at: item.conversation[0].updated_at,
          unread_count: item.unread_count,
        })) || []);
      }
    };

    setup();
  }, [router]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <ConversationList conversations={conversations} onSelect={(conv) => router.push(`/conversations/${conv.id}`)} />
    </div>
  );
}
