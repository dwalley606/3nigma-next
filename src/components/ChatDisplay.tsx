// src/components/ChatDisplay.tsx
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/app/utils/supabase/client'

interface Message {
  id: string
  content: string
  sender_id: string
  timestamp: string
  sender?: { username: string }
}

interface ChatDisplayProps {
  conversationId: string
  initialMessages: Message[]
  currentUserId: string
}

export default function ChatDisplay({
  conversationId,
  initialMessages,
  currentUserId,
}: ChatDisplayProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  useEffect(() => {
    const subscription = supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => {
        const newMessage = payload.new as Message
        setMessages((prev) => [...prev, newMessage])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, conversationId])

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto p-4 bg-gray-800 rounded">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`mb-2 p-2 rounded ${msg.sender_id === currentUserId ? 'bg-blue-600 ml-auto' : 'bg-gray-600 mr-auto'} max-w-[75%]`}
        >
          <span className="text-sm text-gray-300">{msg.sender?.username || 'Unknown'}</span>
          <p>{msg.content}</p>
          <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  )
}