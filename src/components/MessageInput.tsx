'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function MessageInput({ conversationId, userId }: { conversationId: string; userId: string }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        id: crypto.randomUUID(),
        content: message,
        sender_id: userId,
        conversation_id: conversationId,
        timestamp: new Date().toISOString(),
      });

    if (error) {
      console.error('Error sending message:', error.message);
    } else {
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center shrink-0">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-l-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-400"
      />
      <button
        onClick={handleSendMessage}
        className="p-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
      >
        Send
      </button>
    </div>
  );
}