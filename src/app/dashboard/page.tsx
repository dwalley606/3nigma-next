'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import MessageInput from '@/components/MessageInput';

export default function Dashboard() {
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversation');

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/auth?mode=login');
    }
  }, [authLoading, session, router]);

  if (authLoading) return <p>Loading...</p>;
  if (!session || !session.user || !session.user.id) return null;

  const userId = session.user.id;

  return (
    <>
      <Sidebar userId={userId} />
      <div className="flex-1 flex flex-col bg-white">
        {conversationId ? (
          <div className="flex-1 flex flex-col">
            <ChatWindow conversationId={conversationId} userId={userId} />
            <MessageInput conversationId={conversationId} userId={userId} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </>
  );
}