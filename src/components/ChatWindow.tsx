// src/components/ChatWindow.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase/client';

export default function ChatWindow({ conversationId, userId }: { conversationId: string; userId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*, user_profiles(username)') // Join with user_profiles
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();

    const channel = supabase
      .channel(`messages:convo:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) =>
        setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
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
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}>
            <span className="block text-sm text-gray-500">
              {msg.user_profiles?.username || 'Unknown'}
            </span>
            <span className={`inline-block p-2 rounded-lg ${msg.sender_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-gray-50">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}