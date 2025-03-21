// src/app/dashboard/conversations/[conversationId]/page.tsx
import { supabaseServer } from '@/app/utils/supabase/server';
import ChatDisplay from '@/components/ChatDisplay'
import MessageInput from '@/components/MessageInput'

export default async function ChatPage({
  params,
}: {
  params: { conversationId: string }
}) {
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  const { data: messages, error } = await supabaseServer
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