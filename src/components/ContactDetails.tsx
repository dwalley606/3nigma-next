"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase/client';

interface ContactDetailsProps {
  conversationId: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ conversationId }) => {
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', conversationId);
      const userIds = data?.map((p) => p.user_id) || [];
      const { data: users } = await supabase.auth.admin.listUsers();
      const filtered = users.users.filter((u) => userIds.includes(u.id));
      setParticipants(filtered);
    };
    fetchParticipants();
  }, [conversationId]);

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
      <p>Conversation ID: {conversationId}</p>
      <h2 className="text-xl mb-4">Participants</h2>
      {participants.map((p) => (
        <div key={p.id} className="mb-2">
          <p>{p.email}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;