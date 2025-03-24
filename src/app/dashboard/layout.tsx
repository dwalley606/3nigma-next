// src/app/dashboard/layout.tsx
import { createSupabaseServerClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ConversationList from '@/components/ConversationList';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session:', error);
      redirect('/auth?mode=login');
    }

    if (!data.session) {
      redirect('/auth?mode=login');
    }

    return (
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold mb-6">3NIGMA</h1>
          <nav>
            <ConversationList userId={data.session.user.id} />
            <Link href="/dashboard/contacts" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Contacts
            </Link>
            <Link href="/dashboard/conversations" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Conversations
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  } catch (err) {
    console.error('Error in DashboardLayout:', err);
    redirect('/auth?mode=login');
  }
}