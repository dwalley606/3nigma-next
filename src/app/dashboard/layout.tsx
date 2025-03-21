// src/app/dashboard/layout.tsx
import { supabaseServer } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ConversationList from '@/components/ConversationList'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (!user) {
    redirect('/dashboard/login')
  }

  return (
    <div className="flex h-screen">
      {/* Desktop: Sidebar with Navigation */}
      <div className="hidden md:block w-1/4 bg-gray-800 shadow-lg p-4 overflow-y-auto border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">3nigma</h2>
        <nav className="mb-6">
          <Link
            href="/dashboard/conversations"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md"
          >
            Conversations
          </Link>
          <Link
            href={`/dashboard/contacts/${user.id}`}
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Contacts
          </Link>
          <Link
            href="/dashboard/login"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Login
          </Link>
          <Link
            href="/dashboard/signup"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Sign Up
          </Link>
          {/* Add LogoutButton later */}
        </nav>
        <ConversationList userId={user.id} />
      </div>

      {/* Mobile: Toggleable Sidebar */}
      <div className="md:hidden w-full p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">3nigma</h2>
        <nav className="mb-6">
          <Link
            href="/dashboard/conversations"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md"
          >
            Conversations
          </Link>
          <Link
            href={`/dashboard/contacts/${user.id}`}
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Contacts
          </Link>
          <Link
            href="/dashboard/login"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Login
          </Link>
          <Link
            href="/dashboard/signup"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Sign Up
          </Link>
        </nav>
        <ConversationList userId={user.id} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-800 text-gray-100">{children}</div>
    </div>
  )
}