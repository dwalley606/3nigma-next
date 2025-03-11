"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { encryptMessage } from "@/lib/crypto";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  timestamp: string;
  is_group_message: boolean;
}

export default function MessageInput({ 
  conversationId, 
  userId, 
  setMessages, 
  isGroup 
}: { 
  conversationId: string;
  userId: string | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isGroup: boolean;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false); // Track sending status
  const [error, setError] = useState<string | null>(null); // Store error message

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Ensure no empty or whitespace messages

    setSending(true); // Indicate sending in progress
    setError(null); // Clear any previous errors

    try {
      if (!userId) throw new Error("User ID is required");

      // Get participants for the conversation
      const { data: participants, error: participantsError } = await supabase
        .from("conversation_participants")
        .select("user_id")
        .eq("conversation_id", conversationId)
        .neq("user_id", userId);

      if (participantsError) throw new Error("Error fetching participants.");

      const recipientIds = participants?.map((p) => p.user_id) || [];
      const { data: keys, error: keysError } = await supabase
        .from("encryption_keys")
        .select("public_key")
        .in("user_id", recipientIds);

      if (keysError) throw new Error("Error fetching encryption keys.");

      let encryptedMessage;
      if (isGroup) {
        // Encrypt message for each recipient in a group
        encryptedMessage = await Promise.all(
          keys.map(({ public_key }) => encryptMessage(newMessage, public_key))
        );
      } else {
        // Encrypt message for a single recipient
        encryptedMessage = await encryptMessage(newMessage, keys?.[0]?.public_key);
      }

      const optimisticMessage: Message = {
        id: uuidv4(),
        content: newMessage,
        sender_id: userId,
        conversation_id: conversationId,
        timestamp: new Date().toISOString(),
        is_group_message: isGroup,
      };

      setMessages((prev) => [optimisticMessage, ...prev]);
      setNewMessage("");

      // Insert the message into the database
      const { error: insertError } = await supabase.from("messages").insert({
        content: isGroup ? encryptedMessage : encryptedMessage[0], // Store group messages as an array of encrypted texts
        sender_id: userId,
        conversation_id: conversationId,
        is_group_message: isGroup,
      });

      if (insertError) {
        console.error("Send message error:", insertError);
        setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id)); // Revert optimistic update
        setError("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setSending(false); // Reset sending status
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-gray-800 resize-none"
      />
      <button
        type="submit"
        disabled={sending || !newMessage.trim()}
        className={`py-2 px-4 bg-blue-600 text-white font-semibold rounded-md transition-colors ${
          sending || !newMessage.trim() ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {sending ? "Sending..." : "Send"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
