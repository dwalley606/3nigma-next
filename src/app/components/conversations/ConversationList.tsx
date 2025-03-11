'use client';

interface Conversation {
  id: string;
  name?: string;
  is_group: boolean;
  updated_at: string;
  unread_count: number;
}

export default function ConversationList({
  conversations,
  onSelect,
}: {
  conversations: Conversation[];
  onSelect: (conv: Conversation) => void;
}) {
  return (
    <div className="space-y-2">
      {conversations.length > 0 ? (
        conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
          >
            {conv.name || 'Unnamed Chat'}
            {conv.unread_count > 0 && <span className="ml-2 text-sm text-blue-600">({conv.unread_count})</span>}
          </div>
        ))
      ) : (
        <p>No conversations yet.</p>
      )}
    </div>
  );
}
