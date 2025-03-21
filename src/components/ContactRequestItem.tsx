// src/components/ContactRequestItem.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/app/utils/supabase/client'

interface ContactRequest {
  id: string
  from_user_id: string
  status: 'pending' | 'accepted' | 'rejected'
  users: { username: string }
}

interface ContactRequestItemProps {
  request: ContactRequest
  userId: string
}

export default function ContactRequestItem({ request, userId }: ContactRequestItemProps) {
  const [status, setStatus] = useState(request.status)

  const handleAccept = async () => {
    const { error: updateError } = await supabase
      .from('contact_requests')
      .update({ status: 'accepted' })
      .eq('id', request.id)

    if (updateError) {
      console.error('Error accepting request:', updateError)
      return
    }

    const { error: insertError } = await supabase
      .from('contacts')
      .insert({ user_id: userId, contact_id: request.from_user_id })

    if (insertError) {
      console.error('Error adding contact:', insertError)
      return
    }

    setStatus('accepted')
  }

  const handleReject = async () => {
    const { error } = await supabase
      .from('contact_requests')
      .update({ status: 'rejected' })
      .eq('id', request.id)

    if (error) {
      console.error('Error rejecting request:', error)
      return
    }

    setStatus('rejected')
  }

  if (status !== 'pending') return null

  return (
    <li className="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded">
      <span className="text-gray-100">{request.users.username} wants to connect</span>
      <div>
        <button
          onClick={handleAccept}
          className="p-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </li>
  )
}