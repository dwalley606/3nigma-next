// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConversationList from '@/components/ConversationList';

export default function Sidebar({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <aside
        className={`w-full md:w-64 bg-gray-800 text-white p-4 md:h-screen md:sticky md:top-0 ${isOpen ? 'block mt-12' : 'hidden md:block'}`}
      >
        <h1 className="text-2xl font-bold mb-6">3NIGMA</h1>
        <nav>
          <ConversationList userId={userId} />
          <Link href="/dashboard/contacts" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Contacts
          </Link>
          <Link href="/dashboard/conversations" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Conversations
          </Link>
        </nav>
      </aside>
    </>
  );
}