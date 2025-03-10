// components/contacts/ContactList.tsx
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import ContactSearch from "./ContactSearch";
import ContactActions from "./ContactActions";
import ContactRequest from "./ContactRequest";

interface Contact {
  id: string;
  name: string;
  email: string;
}

interface ContactRequestData {
  id: string;
  from_user_id: string;
  status: "pending" | "accepted" | "rejected";
}

const ContactList = ({ userId }: { userId: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<Contact[]>([]); // To store all users
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingRequests, setPendingRequests] = useState<ContactRequestData[]>([]);

  const fetchContacts = useCallback(async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("id, name, email")
      .neq("user_id", userId); // Assuming contacts are stored in the contacts table
    if (error) {
      console.error("Error fetching contacts:", error);
    } else {
      setContacts(data);
    }
  }, [userId]);

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from("users") // Query all users for search
      .select("id, name, email");
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data);
    }
  }, []);

  const fetchPendingRequests = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .eq("to_user_id", userId)
      .eq("status", "pending");
    if (error) {
      console.error("Error fetching pending requests:", error);
    } else {
      setPendingRequests(data);
    }
  }, [userId]);

  useEffect(() => {
    fetchContacts();
    fetchUsers();
    fetchPendingRequests();
  }, [userId, fetchContacts, fetchUsers, fetchPendingRequests]);

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleRequestUpdated = () => {
    fetchPendingRequests(); // Re-fetch pending requests after accepting/declining
  };

  // Filter contacts
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users that are not in your contacts
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !contacts.some((contact) => contact.email === user.email)
  );

  return (
    <div className="p-4">
      <ContactSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <h2 className="text-lg font-semibold">Pending Requests</h2>
      <div>
        {pendingRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          pendingRequests.map((request) => (
            <ContactRequest
              key={request.id}
              requestId={request.id}
              fromUserId={request.from_user_id}
              onRequestUpdated={handleRequestUpdated}
            />
          ))
        )}
      </div>

      <h2 className="text-lg font-semibold">All Contacts</h2>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="flex justify-between items-center mb-4">
            <span>{contact.name} ({contact.email})</span>
            <ContactActions
              userId={userId}
              contactId={contact.id}
              onRequestSent={() => fetchContacts()} // Re-fetch contacts after sending a request
            />
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">Search Results (New Contacts)</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-4">
            <span>{user.name} ({user.email})</span>
            <ContactActions
              userId={userId}
              contactId={user.id}
              onRequestSent={() => fetchContacts()} // Re-fetch contacts after sending a request
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;



