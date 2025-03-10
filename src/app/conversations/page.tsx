"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import MessageList from "../components/messages/MessageList";
import MessageInput from "../components/messages/MessageInput";
import ContactList from "../components/contacts/ContactList"; // Import the ContactList component

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
  name?: string;
  is_group: boolean;
  updated_at: string;
  unread_count: number;
}

interface ConversationData {
  conversation: {
    id: string;
    name: string | null;
    is_group: boolean;
    updated_at: string;
  };
  unread_count: number;
}

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showContacts, setShowContacts] = useState(false); // State to toggle between conversations and contacts
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (mounted) router.push("/login");
        return;
      }
      setUserId(session.user.id);
      await fetchConversations(session.user.id);

      const subscription = supabase
        .channel("messages")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
          const convId = payload.new.conversation_id;
          if (conversations.some((c) => c.id === convId)) {
            if (selectedConv?.id === convId) {
              setMessages((prev) => [payload.new as Message, ...prev]); // Decryption handled in MessageItem
            }
            fetchConversations(session.user.id);
          }
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
        mounted = false;
      };
    };

    const fetchConversations = async (userId: string) => {
      const { data, error } = await supabase
        .from("conversation_participants")
        .select("conversation:conversations(id, name, is_group, updated_at), unread_count")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false, foreignTable: "conversations" });
      if (error) throw error;
      if (mounted) {
        setConversations(((data as unknown) as ConversationData[]).map(({ conversation, unread_count }) => ({
          id: conversation.id,
          name: conversation.name || undefined,
          is_group: conversation.is_group,
          updated_at: conversation.updated_at,
          unread_count,
        })));
      }
    };

    setup();
    return () => { mounted = false; };
  }, [router]);

  const loadMessages = async (conv: Conversation, setMessages: React.Dispatch<React.SetStateAction<Message[]>>, userId: string | null) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("timestamp", { ascending: true });
    if (error) {
      console.error("Load messages error:", error);
      return;
    }
    setMessages(data); // Decryption happens in MessageItem

    await supabase
      .from("conversation_participants")
      .update({ unread_count: 0 })
      .eq("conversation_id", conv.id)
      .eq("user_id", userId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar or header for navigation */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <button
          onClick={() => setShowContacts(false)}
          className="w-full py-2 px-4 text-gray-800 font-semibold hover:bg-gray-200 rounded-md"
        >
          Conversations
        </button>
        <button
          onClick={() => setShowContacts(true)}
          className="w-full py-2 px-4 text-gray-800 font-semibold hover:bg-gray-200 rounded-md mt-4"
        >
          Contacts
        </button>
        {!showContacts && (
          <div className="mt-4 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConv(conv);
                  loadMessages(conv, setMessages, userId);
                }}
                className={`p-2 rounded-md cursor-pointer ${
                  selectedConv?.id === conv.id ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                {conv.name || "Unnamed Chat"}
                {conv.unread_count > 0 && (
                  <span className="ml-2 text-sm text-blue-600">({conv.unread_count})</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {selectedConv?.name || "Messages"}
          </h1>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Conditionally render Contacts or Conversations */}
        {showContacts ? (
          <ContactList userId={userId || ""} /> // Properly rendering the ContactList component
        ) : selectedConv ? (
          <>
            <MessageList messages={messages} userId={userId} />
            <MessageInput
              conversationId={selectedConv.id}
              userId={userId}
              setMessages={setMessages}
              isGroup={selectedConv.is_group}
            />
          </>
        ) : (
          <div className="text-center text-gray-600">Select a conversation</div>
        )}
      </div>
    </div>
  );
}
