// components/contacts/ContactItem.tsx

import React from "react";

interface Contact {
  username: string;
  email: string;
  profile_pic_url?: string;
}

type ContactItemProps = {
  contact: Contact;
};

const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <li className="flex items-center space-x-4 p-4 border-b border-gray-300">
      <img
        src={contact.profile_pic_url || "/default-profile-pic.png"}
        alt={contact.username}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{contact.username}</h3>
        <p className="text-gray-600">{contact.email}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Message
      </button>
    </li>
  );
};

export default ContactItem;
