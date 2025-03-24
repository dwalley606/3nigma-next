// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/utils/supabase/client';
import ChatWindow from '@/components/ChatWindow';
import ContactDetails from '@/components/ContactDetails';

export default function Dashboard() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConvo, setSelectedConvo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth?mode=login');
    }
  }, [session, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!session) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const convoId = searchParams.get('convo');

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      <div className="w-full md:w-2/3">
        {convoId ? (
          <ChatWindow conversationId={convoId} userId={session.user.id} />
        ) : (
          <div className="p-4">
            <h1 className="text-2xl">Dashboard</h1>
            <p>Welcome to your dashboard! Select a conversation to start.</p>
          </div>
        )}
      </div>
      {convoId && (
        <div className="w-full md:w-1/3 hidden md:block">
          <ContactDetails conversationId={convoId} />
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 md:absolute md:bottom-4 md:right-4"
      >
        Logout
      </button>
    </div>
  );
}