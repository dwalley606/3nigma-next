import { createClient } from '@/app/utils/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <div className="p-6 text-red-500">Please log in to view the dashboard.</div>;
  }

  // Fetch conversations for the logged-in user
  const { data: conversationsData, error } = await supabase
    .from('conversation_participants')
    .select(`
      conversation_id,
      conversations (
        id,
        is_group,
        name,
        last_message_id,
        messages!last_message_id (
          id,
          content,
          timestamp,
          sender_id,
          users (id, username)
        )
      ),
      unread_count
    `)
    .eq('user_id', user.id);

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  const conversations = conversationsData?.map((participant) => ({
    ...participant.conversations,
    unread_count: participant.unread_count,
  })) || [];

  // Mock selected conversation (replace with dynamic selection later)
  const selectedConversation = conversations[0];

  return (
    <div className="flex h-screen">
      {/* Conversations List (Left Pane) */}
      <div className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Conversations</h2>
        {conversations.length ? (
          <div className="space-y-4">
            {conversations.map((conv) => {
              const lastMessage = conv.messages;
              return (
                <Link key={conv.id} href={`/dashboard/conversations/${conv.id}`} className="block">
                  <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition">
                    <p className="text-gray-300">
                      {conv.name || (conv.is_group ? 'Group Chat' : 'Direct Chat')}
                      {conv.unread_count > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread_count}
                        </span>
                      )}
                    </p>
                    {lastMessage ? (
                      <>
                        <p className="text-gray-400 text-sm">
                          {lastMessage.sender_id === user.id ? 'You' : lastMessage.users?.username}: {lastMessage.content}
                        </p>
                        <p className="text-gray-500 text-xs">{new Date(lastMessage.timestamp).toLocaleString()}</p>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">No messages yet.</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No conversations found.</p>
        )}
      </div>

      {/* Message Pane (Center Pane) */}
      <div className="w-2/4 bg-gray-700 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          {selectedConversation?.name || 'Select a Conversation'}
        </h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {selectedConversation?.messages ? (
            <div className="space-y-4">
              <div
                className={`p-2 rounded-lg ${
                  selectedConversation.messages.sender_id === user.id
                    ? 'bg-blue-600 self-end text-right'
                    : 'bg-gray-600 self-start'
                }`}
              >
                <p className="text-gray-100">
                  {selectedConversation.messages.content}
                </p>
                <p className="text-gray-300 text-xs">
                  {selectedConversation.messages.users?.username || 'Unknown'}{' '}
                  {new Date(selectedConversation.messages.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No messages in this conversation.</p>
          )}
        </div>
      </div>

      {/* Message Input (Right Pane) */}
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col justify-end">
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}