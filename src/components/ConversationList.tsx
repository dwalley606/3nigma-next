'use client';

import { useRouter } from 'next/navigation';

export default function ConversationList({ conversations }: { conversations: any[] }) {
  const router = useRouter();

  const startConversation = (conversationId: string) => {
    router.push(`/dashboard?conversation=${conversationId}`);
  };

  return (
    <ul className="space-y-2">
      {conversations.length === 0 ? (
        <li className="p-2 text-gray-600">No conversations found</li>
      ) : (
        conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
            onClick={() => startConversation(conversation.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{conversation.name || 'Unnamed Chat'}</p>
                <p className="text-sm text-gray-600">Last message placeholder</p>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(conversation.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}