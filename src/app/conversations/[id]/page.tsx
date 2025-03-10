// /pages/conversations/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MessageList from "../../components/messages/MessageList";
import MessageInput from "../../components/messages/MessageInput";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  timestamp: string;
  is_group_message: boolean;
}

interface Conversation {
  id: string;
  name: string | null;
  is_group: boolean;
  updated_at: string;
}

export default function ConversationPage() {
  const router = useRouter();
  const { id } = router.query; // Capture the `id` from the URL (e.g., /conversations/[id])
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Wait until the `id` is available

      // Get the user session (assuming you already handle authentication with supabase)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }
      setUserId(session.user.id);

      // Fetch the conversation data
      const { data: convData, error: convError } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id)
        .single();
      if (convError) {
        console.error("Error fetching conversation:", convError);
        return;
      }
      setConversation(convData);

      // Fetch messages for this conversation
      const { data: msgData, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", id)
        .order("timestamp", { ascending: true });
      if (msgError) {
        console.error("Error fetching messages:", msgError);
        return;
      }
      setMessages(msgData);
    };

    fetchData();
  }, [id, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 bg-gray-50 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {conversation?.name || "Conversation"}
          </h1>
        </div>
        {conversation && (
          <>
            <MessageList messages={messages} userId={userId} />
            <MessageInput
              conversationId={conversation.id}
              userId={userId}
              setMessages={setMessages}
              isGroup={conversation.is_group}
            />
          </>
        )}
      </div>
    </div>
  );
}
