import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';

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

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header username={profile?.username || 'User'} />
      <div className="flex flex-1 bg-gray-900 overflow-hidden">
        {children}
      </div>
    </div>
  );
}