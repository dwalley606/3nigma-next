'use client';
import { useState } from 'react';
import ContactItem from './ContactItem';
import ContactRequestItem from './ContactRequestItem';

interface Contact {
  id: string;
  username: string;
  email: string;
}

interface ContactRequest {
  id: string;
  from_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ContactsSection({
  contacts,
  pendingRequests,
  userId,
}: {
  contacts: Contact[];
  pendingRequests: ContactRequest[];
  userId: string;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-100">Contacts</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search contacts..."
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      <h3 className="text-md font-medium mt-4 text-gray-100">Pending Requests</h3>
      {pendingRequests.length === 0 ? (
        <p className="text-gray-400">No pending requests.</p>
      ) : (
        pendingRequests.map((request) => (
          <ContactRequestItem
            key={request.id}
            request={request}
            userId={userId}
          />
        ))
      )}

      <h3 className="text-md font-medium mt-4 text-gray-100">Your Contacts</h3>
      <ul>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} userId={userId} />
          ))
        ) : (
          <p className="text-gray-400">No contacts found.</p>
        )}
      </ul>
    </div>
  );
}