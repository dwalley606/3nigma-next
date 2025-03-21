// src/app/dashboard/conversations/[conversationId]/MessageInput.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/app/utils/supabase/client';

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('messages')
      .insert({
        content: message,
        conversation_id: conversationId,
        sender_id: (await supabase.auth.getUser()).data.user?.id,
        timestamp: new Date().toISOString(),
      })
    if (error) console.error('Error sending message:', error)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-600 rounded">
        Send
      </button>
    </form>
  )
}