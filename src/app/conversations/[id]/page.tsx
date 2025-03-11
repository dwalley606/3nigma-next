'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import MessageList from '../../components/conversations/MessageList';
import MessageInput from '../../components/conversations/MessageInput';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  timestamp: string;
  is_group_message: boolean;
}

export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUserId(session.user.id);
      await loadMessages(session.user.id, id as string);
    };

    const loadMessages = async (userId: string, convId: string) => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('timestamp', { ascending: true });
      if (error) console.error('Load messages error:', error);
      if (mounted) setMessages(data || []);

      await supabase
        .from('conversation_participants')
        .update({ unread_count: 0 })
        .eq('conversation_id', convId)
        .eq('user_id', userId);
    };

    setup();
    return () => { mounted = false; };
  }, [router, id]);

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>
      <MessageList messages={messages} userId={userId} />
      <MessageInput conversationId={id as string} userId={userId} setMessages={setMessages} isGroup={false} />
    </div>
  );
}
