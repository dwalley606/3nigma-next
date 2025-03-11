'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ContactRequest {
  id: string;
  from_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ContactRequestItem({
  request,
  userId,
}: {
  request: ContactRequest;
  userId: string;
}) {
  const [status, setStatus] = useState(request.status);
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  const handleAccept = async () => {
    await supabase
      .from('contact_requests')
      .update({ status: 'accepted' })
      .eq('id', request.id);
    await supabase.from('contacts').insert({ user_id: userId, contact_id: request.from_user_id });
    setStatus('accepted');
  };

  const handleReject = async () => {
    await supabase
      .from('contact_requests')
      .update({ status: 'rejected' })
      .eq('id', request.id);
    setStatus('rejected');
  };

  if (status !== 'pending') return null;

  return (
    <li className="flex justify-between items-center mb-2">
      <span className="text-gray-100">{request.from_user_id} wants to connect</span>
      <div>
        <button onClick={handleAccept} className="p-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700">
          Accept
        </button>
        <button onClick={handleReject} className="p-1 bg-red-600 text-white rounded hover:bg-red-700">
          Reject
        </button>
      </div>
    </li>
  );
}