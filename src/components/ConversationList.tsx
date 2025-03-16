// src/components/ConversationList.tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/app/utils/supabase/client'
import Link from 'next/link'

interface Conversation {
  id: string
  name?: string
  last_message_id?: string
  last_message?: { content: string; timestamp: string }
}

interface ConversationListProps {
  userId: string
}

export default function ConversationList({ userId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('id, name, last_message_id, messages!last_message_id(content, timestamp)')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching conversations:', error)
        return
      }

      setConversations(data || [])
    }

    fetchConversations()

    const subscription = supabase
      .channel('conversations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === newMessage.conversation_id
              ? { ...conv, last_message_id: newMessage.id, last_message: { content: newMessage.content, timestamp: newMessage.timestamp } }
              : conv
          )
        )
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, userId])

  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Conversations</h2>
      {conversations.length > 0 ? (
        <ul>
          {conversations.map((conv) => (
            <li key={conv.id} className="mb-2">
              <Link href={`/dashboard/conversations/${conv.id}`}>
                <div className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                  <span className="text-gray-100">{conv.name || `Conversation ${conv.id}`}</span>
                  {conv.last_message && (
                    <p className="text-sm text-gray-400 truncate">{conv.last_message.content}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No conversations yet.</p>
      )}
    </div>
  )
}