// src/app/dashboard/conversations/[conversationId]/page.tsx
import { createClient } from '@/utils/supabase/server'
import ChatDisplay from '@/components/ChatDisplay'
import MessageInput from '@/components/MessageInput'

interface Message {
  id: string
  content: string
  sender_id: string
  timestamp: string
  sender?: { username: string }
}

export default async function ChatPage({
  params,
}: {
  params: { conversationId: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*, sender:users!sender_id(username)')
    .eq('conversation_id', params.conversationId)
    .order('timestamp', { ascending: true })

  if (error) {
    console.error('Error fetching messages:', error)
    return <div>Error loading chat</div>
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      <ChatDisplay
        conversationId={params.conversationId}
        initialMessages={messages || []}
        currentUserId={user.id}
      />
      <MessageInput conversationId={params.conversationId} />
    </div>
  )
}