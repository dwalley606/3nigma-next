// MessageList.tsx
"use client";

import { decryptMessage } from "@/lib/crypto";
import { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  timestamp: string;
  is_group_message: boolean;
}

export default function MessageList({ messages, userId }: { messages: Message[]; userId: string | null }) {
  const [decryptedMessages, setDecryptedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const decryptAll = async () => {
      if (!userId) return;
      const decrypted = await Promise.all(
        messages.map((msg) => decryptMessage(msg.content, userId))
      );
      setDecryptedMessages(messages.map((msg, i) => ({ ...msg, content: decrypted[i] })));
    };
    decryptAll();
  }, [messages, userId]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 bg-white p-4 rounded-md shadow-inner">
      {decryptedMessages.map((msg) => (
        <MessageItem key={msg.id} message={msg} userId={userId} />
      ))}
    </div>
  );
}
