import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/app/utils/supabase/server';
import { encryptMessage } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const { conversationId, content, recipientId } = await req.json();

    // Get the recipient's public key
    const { data: recipient, error: recipientError } = await supabaseServer
      .from('users')
      .select('public_key')
      .eq('id', recipientId)
      .single();

    if (recipientError || !recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    // Encrypt the message
    const { content: encryptedContent, contentKey, iv } = await encryptMessage(content, recipient.public_key);

    // Store the message
    const { data, error } = await supabaseServer
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: (await supabaseServer.auth.getUser()).data.user?.id,
        content: encryptedContent,
        content_key: contentKey,
        iv,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}