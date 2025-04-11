'use client';

import { useRouter } from 'next/navigation';

export default function ConversationList({ conversations }: { conversations: any[] }) {
  const router = useRouter();

  const startConversation = (conversationId: string) => {
    router.push(`/dashboard?conversation=${conversationId}`);
  };

  return (
    <ul>
      {conversations.length === 0 ? (
        <li>No conversations found</li>
      ) : (
        conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => startConversation(conversation.id)}
          >
            {conversation.name || 'Unnamed Chat'}
          </li>
        ))
      )}
    </ul>
  );
}