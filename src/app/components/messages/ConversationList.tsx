"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Conversation {
  id: string;
  name?: string;
  is_group: boolean;
  updated_at: string;
  unread_count: number;
}

export default function ConversationList({ 
  conversations, 
  setSelectedConv, 
  loadMessages, 
  userId,
  selectedConv 
}: { 
  conversations: Conversation[];
  setSelectedConv: (conv: Conversation) => void;
  loadMessages: (conv: Conversation) => void;
  userId: string | null;
  selectedConv: Conversation | null;
}) {
  const [contactEmail, setContactEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddContact = async () => {
    setError(null); // Reset error before each operation
    try {
      const { data: contactUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", contactEmail)
        .single();

      if (userError || !contactUser) {
        setError("User not found or error fetching user.");
        return;
      }

      const { data: existingConvs, error: convError } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", userId)
        .eq("conversation_id", (await supabase
          .from("conversation_participants")
          .select("conversation_id")
          .eq("user_id", contactUser.id)).data?.[0]?.conversation_id);

      if (convError) {
        setError("Error checking for existing conversation.");
        return;
      }

      if (!existingConvs?.length) {
        const { data: newConv, error: newConvError } = await supabase
          .from("conversations")
          .insert({ is_group: false })
          .select()
          .single();
        if (newConvError || !newConv) {
          setError("Error creating new conversation.");
          return;
        }

        await supabase.from("conversation_participants").insert([
          { conversation_id: newConv.id, user_id: userId },
          { conversation_id: newConv.id, user_id: contactUser.id },
        ]);
      }

      setContactEmail("");
      // Conversations will be updated through the subscription in the parent
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-80 bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => {
              setSelectedConv(conv);
              loadMessages(conv);
            }}
            className={`p-2 rounded-md cursor-pointer ${
              conv.id === selectedConv?.id ? "bg-blue-100 text-blue-800" : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            {conv.name || "Unnamed Chat"} {conv.is_group && "(Group)"}
            {conv.unread_count > 0 && (
              <span className="ml-2 text-sm text-blue-600">({conv.unread_count})</span>
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
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
