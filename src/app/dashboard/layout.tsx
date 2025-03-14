// src/app/dashboard/layout.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ConversationList from '@/components/ConversationList'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Desktop: Sidebar for Conversation List */}
      <div className="hidden md:block w-1/4 bg-gray-800 p-4 overflow-y-auto border-r border-gray-700">
        <ConversationList userId={user.id} />
      </div>

      {/* Mobile: Full-width Conversation List (toggleable) */}
      <div className="md:hidden w-full p-4">
        <ConversationList userId={user.id} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}