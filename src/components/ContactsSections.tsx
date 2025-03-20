// src/components/ContactsSection.tsx
'use client'
import { useState } from 'react'
import ContactRequestItem from './ContactRequestItem'

interface Contact {
  id: string
  username: string
  email: string
}

interface ContactRequest {
  id: string
  from_user_id: string
  status: 'pending' | 'accepted' | 'rejected'
  users: { username: string }
}

interface ContactsSectionProps {
  contacts: Contact[]
  pendingRequests: ContactRequest[]
  userId: string
}

export default function ContactsSection({
  contacts,
  pendingRequests,
  userId,
}: ContactsSectionProps) {
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 bg-gray-800 rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Contacts</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 rounded text-gray-100"
      />

      {/* Contacts List */}
      {filteredContacts.length > 0 ? (
        <ul className="mb-6">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="p-2 bg-gray-600 rounded mb-2">
              {contact.username} ({contact.email})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mb-6">No contacts found.</p>
      )}

      {/* Pending Requests */}
      <h3 className="text-lg font-semibold mb-2 text-gray-100">Pending Requests</h3>
      {pendingRequests.length > 0 ? (
        <ul>
          {pendingRequests.map((request) => (
            <ContactRequestItem key={request.id} request={request} userId={userId} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No pending requests.</p>
      )}
    </div>
  )
}