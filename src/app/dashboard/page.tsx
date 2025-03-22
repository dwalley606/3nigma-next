"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabase/client';

export default function Dashboard() {
  const { session, loading } = useAuth();
  const router = useRouter();

  // Middleware handles redirect if not logged in
  if (loading) return <p>Loading...</p>;
  if (!session) return null; // Render nothing; middleware will redirect

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}