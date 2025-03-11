'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
    >
      Logout
    </button>
  );
}