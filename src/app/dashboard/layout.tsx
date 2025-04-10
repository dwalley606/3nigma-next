// src/app/dashboard/layout.tsx
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar'; // New client component

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  let user;
  if (sessionError || !sessionData.session) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) redirect('/auth?mode=login');
    user = userData.user;
  } else {
    user = sessionData.session.user;
  }

  console.log('Server User:', user);

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Sidebar userId={user.id} />
      </div>
      <main className="flex-1 p-6 ml-64">
        {children}
      </main>
    </div>
  );
}