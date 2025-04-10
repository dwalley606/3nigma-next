'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

interface ChatWindowProps {
  conversationId: string;
  userId: string;
}

export default function ChatWindow({ conversationId, userId }: ChatWindowProps) {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) {
      setLoading(false);
      return;
    }

    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) console.error(error);
      else setMessages(data || []);
      setLoading(false);
    }

    fetchMessages();

    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        content: newMessage,
        sender_id: session.user.id,
        conversation_id: conversationId,
      });

    if (error) console.error(error);
    else setNewMessage('');
  };

  if (loading) return <div>Loading messages...</div>;
  if (!conversationId) return <div>Select a contact to start chatting</div>;

  return (
    <div className="flex-1 p-4">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.sender_id === userId ? 'You' : 'Them'}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}