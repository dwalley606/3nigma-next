"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { encryptMessage, decryptMessage } from "@/lib/crypto";

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

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Messages session:", session, "Error:", error);
      if (error || !session) {
        if (mounted) router.push("/login");
        return;
      }

      const fetchConversations = async () => {
        const { data, error } = await supabase
          .from("conversation_participants")
          .select(`
            conversation:conversations(id, name, is_group, updated_at),
            unread_count
          `)
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false, foreignTable: "conversations" }); // Fixed here
        if (error) {
          console.error("Fetch conversations full error:", error);
          throw error;
        } else if (mounted) {
          setConversations(data || []);
        }
      };
      fetchConversations();

      const subscription = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          async (payload) => {
            const convId = payload.new.conversation_id;
            if (conversations.some((c) => c.conversation.id === convId)) {
              if (selectedConv?.id === convId) {
                const decrypted = await decryptMessage(payload.new.content, /* privateKey */);
                setMessages((prev) => [
                  { ...payload.new, content: decrypted } as Message,
                  ...prev,
                ]);
              }
              fetchConversations();
            }
          }
        )
        .subscribe();

      return () => supabase.removeChannel(subscription);
    };

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session);
      if (event === "SIGNED_IN" && mounted) setup();
      else if (event === "SIGNED_OUT" && mounted) router.push("/login");
    });

    setup();

    return () => { mounted = false; };
  }, [selectedConv, router]);

  const loadMessages = async (conv: Conversation) => {
    setSelectedConv(conv);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("timestamp", { ascending: true });
    if (error) {
      console.error("Load messages error:", error);
      return;
    }

    const decryptedMessages = await Promise.all(
      data.map((msg) => decryptMessage(msg.content, /* privateKey */))
    );
    setMessages(data.map((msg, i) => ({ ...msg, content: decryptedMessages[i] })));
    await supabase
      .from("conversation_participants")
      .update({ unread_count: 0 })
      .eq("conversation_id", conv.id)
      .eq("user_id", supabase.auth.getUser().data.user?.id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage || !selectedConv) return;

    const user = supabase.auth.getUser().data.user;
    if (!user) return;

    const { data: participants } = await supabase
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", selectedConv.id)
      .neq("user_id", user.id);
    const recipientIds = participants?.map((p) => p.user_id) || [];
    const { data: keys } = await supabase
      .from("encryption_keys")
      .select("public_key")
      .in("user_id", recipientIds);
    const publicKey = keys?.[0]?.public_key;

    const encrypted = await encryptMessage(newMessage, publicKey);
    const { error } = await supabase.from("messages").insert({
      content: encrypted,
      sender_id: user.id,
      conversation_id: selectedConv.id,
      is_group_message: selectedConv.is_group,
    });
    if (error) console.error("Send message error:", error);
    setNewMessage("");
  };

  const handleAddContact = async () => {
    const user = supabase.auth.getUser().data.user;
    if (!user || !contactEmail) return;

    const { data: contactUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", contactEmail)
      .single();
    if (!contactUser) return;

    const { data: existingConv } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id)
      .eq("conversation_id", (await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", contactUser.id)).data?.[0]?.conversation_id);
    if (!existingConv?.length) {
      const { data: newConv } = await supabase
        .from("conversations")
        .insert({ is_group: false })
        .select()
        .single();
      await supabase.from("conversation_participants").insert([
        { conversation_id: newConv?.id, user_id: user.id },
        { conversation_id: newConv?.id, user_id: contactUser.id },
      ]);
    }
    setContactEmail("");
    const { data } = await supabase
      .from("conversation_participants")
      .select("conversation:conversations(id, name, is_group, updated_at), unread_count")
      .eq("user_id", user.id);
    setConversations(data || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-80 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversations</h2>
        <ul className="space-y-2">
          {conversations.map(({ conversation, unread_count }) => (
            <li
              key={conversation.id}
              onClick={() => loadMessages(conversation)}
              className={`p-2 rounded-md cursor-pointer ${
                selectedConv?.id === conversation.id
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {conversation.name || "Unnamed Chat"} {conversation.is_group && "(Group)"}
              {unread_count > 0 && (
                <span className="ml-2 text-sm text-blue-600">({unread_count})</span>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Add contact by email"
          className="w-full p-2 mt-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800"
          onKeyPress={(e) => e.key === "Enter" && handleAddContact()}
        />
      </div>
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
        <div className="flex-1 overflow-y-auto mb-4 bg-white p-4 rounded-md shadow-inner">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-3 rounded-md ${
                msg.sender_id === supabase.auth.getUser().data.user?.id
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.content}
            </div>
          ))}
        </div>
        {selectedConv && (
          <form onSubmit={handleSend} className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-gray-800 resize-none"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}