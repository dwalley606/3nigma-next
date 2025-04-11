'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth?mode=login');
  };

  return (
    <div className="w-64 bg-gray-100 p-4 text-black flex flex-col h-screen">
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 hover:bg-gray-200 rounded">
              Conversations
            </Link>
          </li>
          <li>
            <Link href="/dashboard/contacts" className="block p-2 hover:bg-gray-200 rounded">
              Contacts
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="block p-2 hover:bg-gray-200 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}