// src/components/ContactDetails.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

interface Participant {
  id: string;
  email?: string;
  username: string;
}

interface ParticipantRecord {
  user_id: string;
  user_profiles: {
    username: string;
  };
}

export default function ContactDetails({ conversationId }: { conversationId: string }) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from('conversation_participants')
        .select('user_id, user_profiles(username)')
        .eq('conversation_id', conversationId) as { data: ParticipantRecord[] | null };
      const userIds = data?.map((p) => p.user_id) || [];
      const { data: users } = await supabase.auth.admin.listUsers();
      const filtered = users.users
        .filter((u) => userIds.includes(u.id))
        .map((u) => ({
          id: u.id,
          email: u.email,
          username: data?.find((p) => p.user_id === u.id)?.user_profiles?.username || u.email?.split('@')[0] || 'Unknown'
        }));
      setParticipants(filtered);
    };
    fetchParticipants();
  }, [conversationId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Participants</h2>
      {participants.map((p) => (
        <div key={p.id} className="mb-2">
          <p>{p.username} ({p.email})</p>
        </div>
      ))}
    </div>
  );
}