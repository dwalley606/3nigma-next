import { NextResponse } from 'next/server';
import { getOrCreateConversation } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const { userId, contactId } = await request.json();
  
  try {
    const conversationId = await getOrCreateConversation(userId, contactId);
    return NextResponse.json({ conversationId });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}