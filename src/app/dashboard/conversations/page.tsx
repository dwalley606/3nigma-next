// src/app/dashboard/conversations/page.tsx
import { createClient } from '@/utils/supabase/server'

export default async function ConversationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('id, name, last_message_id')
    .eq('user_id', user.id) // Adjust based on your schema

  if (error) {
    console.error('Error fetching conversations:', error)
    return <div>Error loading conversations</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      <ul>
        {conversations.map((conv) => (
          <li key={conv.id}>{conv.name || `Conv ${conv.id}`}</li>
        ))}
      </ul>
    </div>
  )
}