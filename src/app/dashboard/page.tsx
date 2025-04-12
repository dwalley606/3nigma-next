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
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar userId={userId} />
      <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
        {conversationId ? (
          <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden w-full h-full">
            <div className="flex-1 overflow-y-auto">
              <ChatWindow conversationId={conversationId} userId={userId} />
            </div>
            <div className="shrink-0">
              <MessageInput conversationId={conversationId} userId={userId} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-100 overflow-hidden w-full">
            <p className="text-gray-400">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}