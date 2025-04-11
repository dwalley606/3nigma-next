'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function ChatWindow({ conversationId, userId }: { conversationId: string; userId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('id, content, sender_id, timestamp')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error.message);
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    }

    fetchMessages();

    const subscription = supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [conversationId]);

  if (loading) return <p className="text-gray-900">Loading messages...</p>;

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-white">
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-3 rounded-lg max-w-xs ${
              message.sender_id === userId ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-900'
            }`}
          >
            <p>{message.content}</p>
            <p className="text-xs mt-1 opacity-75">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))
      )}
    </div>
  );
}