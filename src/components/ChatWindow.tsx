"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase/client';

export default function ChatWindow({ conversationId, userId }: { conversationId: string; userId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages:convo:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) =>
        setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const { error } = await supabase
      .from('messages')
      .insert({ content: newMessage, sender_id: userId, conversation_id: conversationId });
    if (!error) setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}