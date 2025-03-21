// src/components/MessageInput.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/app/utils/supabase/client';

interface MessageInputProps {
  conversationId: string
}

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('User not authenticated')
      return
    }

    const { error } = await supabase
      .from('messages')
      .insert({
        content: message,
        conversation_id: conversationId,
        sender_id: user.id,
        timestamp: new Date().toISOString(),
      })

    if (error) {
      console.error('Error sending message:', error)
      return
    }

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 bg-gray-700 rounded text-gray-100"
      />
      <button type="submit" className="p-2 bg-blue-600 rounded hover:bg-blue-700">
        Send
      </button>
    </form>
  )
}