import { createClient } from '@/app/utils/supabase/server';
import Link from 'next/link';

export default async function ConversationsPage() {
  const supabase = await createClient();
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('id, user, group, last_message, timestamp')
    .limit(10);

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-100 mb-4">Conversations</h1>
      {conversations?.length ? (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <Link key={conv.id} href={`/dashboard/conversations/${conv.id}`} className="block">
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition">
                <p className="text-gray-300">{conv.group || conv.user}</p>
                <p className="text-gray-400 text-sm">{conv.last_message}</p>
                <p className="text-gray-500 text-xs">{new Date(conv.timestamp).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No conversations found.</p>
      )}
    </div>
  );
}