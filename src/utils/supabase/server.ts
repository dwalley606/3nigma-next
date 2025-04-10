import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log('Server Cookies:', cookieStore.getAll()); // Debug

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookies) => cookies.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })),
      },
    }
  );
};

export async function getOrCreateConversation(userId: string, contactId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: existing, error: fetchError } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', userId)
    .in('conversation_id', (
      await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', contactId)
    ).data?.map(p => p.conversation_id) || [])
    .eq('conversations.is_group', false)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
  if (existing) return existing.conversation_id;

  const { data: convo, error: convoError } = await supabase
    .from('conversations')
    .insert({ is_group: false })
    .select('id')
    .single();

  if (convoError) throw convoError;

  const conversationId = convo.id;
  await supabase.from('conversation_participants').insert([
    { conversation_id: conversationId, user_id: userId },
    { conversation_id: conversationId, user_id: contactId },
  ]);

  return conversationId;
}