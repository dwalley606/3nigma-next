"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase/client';
import { decryptMessage } from '@/lib/crypto';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  content_key: string;
  iv: string;
  created_at: string;
}

export default function Conversation({ params }: { params: { conversationId: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [privateKey, setPrivateKey] = useState<string>(''); // Assume this is retrieved securely

  useEffect(() => {
    // Fetch private key (in a real app, decrypt it using user credentials)
    const fetchPrivateKey = async () => {
      const { data } = await supabase
        .from('encryption_keys')
        .select('private_key')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();
      setPrivateKey(data?.private_key || '');
    };
    fetchPrivateKey();

    // Fetch messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('id, sender_id, content, content_key, iv, created_at')
        .eq('conversation_id', params.conversationId);
      if (data) {
        const decryptedMessages = await Promise.all(
          data.map(async (msg) => ({
            ...msg,
            content: await decryptMessage(msg.content, msg.content_key, msg.iv, privateKey),
          }))
        );
        setMessages(decryptedMessages);
      }
    };
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${params.conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${params.conversationId}` }, async (payload) => {
        const newMessage = payload.new as Message;
        const decryptedMessage = {
          ...newMessage,
          content: await decryptMessage(newMessage.content, newMessage.content_key, newMessage.iv, privateKey),
        };
        setMessages((prev) => [...prev, decryptedMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.conversationId, privateKey]);

  return (
    <div>
      <h1>Conversation</h1>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <p>{msg.sender_id}: {msg.content}</p>
          </div>
        ))}
      </div>
      <MessageInput conversationId={params.conversationId} />
    </div>
  );
}