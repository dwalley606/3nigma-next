"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  encrypted_content: string;
  created_at: string;
}

interface Contact {
  contact_id: string;
  users: {
    email: string;
  };
}

interface DatabaseContact {
  contact_id: string;
  users: {
    email: string;
  };
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.id);

      const { data: contactsData } = await supabase
        .from("contacts")
        .select("contact_id, users!contacts_contact_id_fkey(email)")
        .eq("user_id", decoded.id);
      setContacts((contactsData as DatabaseContact[]) || []);

      const { data: messagesData } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${decoded.id},recipient_id.eq.${decoded.id}`)
        .order("created_at", { ascending: false });
      setMessages(messagesData || []);
    };

    const subscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        if (payload.new.sender_id === userId || payload.new.recipient_id === userId) {
          setMessages((prev) => [payload.new as Message, ...prev]);
        }
      })
      .subscribe();

    fetchData();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId, router]);

  const handleSend = async () => {
    if (!userId || !recipientId || !message) return;

    const { error } = await supabase
      .from("messages")
      .insert({ sender_id: userId, recipient_id: recipientId, encrypted_content: message });

    if (!error) setMessage("");
  };

  const handleAddContact = async () => {
    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("email", contactEmail)
      .single();
    if (userData && userId) {
      await supabase
        .from("contacts")
        .insert({ user_id: userId, contact_id: userData.id });
      setContacts([...contacts, { contact_id: userData.id, users: { email: contactEmail } }]);
      setContactEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contacts</h2>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li
              key={contact.contact_id}
              onClick={() => setRecipientId(contact.contact_id)}
              className={`p-2 rounded-md cursor-pointer ${recipientId === contact.contact_id ? "bg-blue-100 text-blue-800" : "text-gray-800 hover:bg-gray-100"}`}
            >
              {contact.users.email}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Add contact email"
          className="w-full p-2 mt-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800"
          onKeyPress={(e) => e.key === "Enter" && handleAddContact()}
        />
      </div>
      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h1>
        <div className="h-[calc(100vh-200px)] overflow-y-auto mb-4 bg-white p-4 rounded-md shadow-inner">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2 text-gray-800">
              <span className="font-medium">
                {msg.sender_id === userId ? "Me" : msg.sender_id} → {msg.recipient_id}
              </span>
              : {msg.encrypted_content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Recipient ID (UUID)"
          className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-md text-gray-800"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full p-2 mb-4 bg-white border border-gray-300 rounded-md text-gray-800 resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSend}
            className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}