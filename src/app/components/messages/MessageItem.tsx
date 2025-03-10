// MessageItem.tsx
"use client";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  timestamp: string;
  is_group_message: boolean;
}

export default function MessageItem({ message, userId }: { message: Message; userId: string | null }) {
  const isSender = message.sender_id === userId;

  return (
    <div
      key={message.id}
      className={`mb-2 p-3 rounded-md ${isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"}`}
      style={{ maxWidth: "70%" }}
    >
      {message.content}
    </div>
  );
}
