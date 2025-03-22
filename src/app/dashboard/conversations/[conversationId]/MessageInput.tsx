"use client";

import { useState } from 'react';
import { supabase } from '@/app/utils/supabase/client';

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim()) return;

    // Fetch the recipient (simplified for 1:1; for groups, fetch all participants)
    const { data: participants } = await supabase
      .from('conversation_participants')
      .select('user_id')
      .eq('conversation_id', conversationId)
      .neq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (participants?.length) {
      const recipientId = participants[0].user_id;

      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content: message, recipientId }),
      });

      if (res.ok) {
        setMessage('');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}