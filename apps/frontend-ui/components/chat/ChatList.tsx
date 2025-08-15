'use client';

import { ChatItem } from './ChatItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chat } from '@/app/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  searchQuery: string;
  loading?: boolean;
}

export const ChatList = ({
  chats,
  selectedChatId,
  onChatSelect,
  searchQuery,
  loading
}: ChatListProps) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredChats = chats.filter(chat => {
    const firstParticipantName = chat.participants?.[0]?.name || '';
    const chatName = chat.isGroup ? chat.groupName || '' : firstParticipantName;
    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pinnedChats = filteredChats.filter(chat => chat.isPinned);
  const unpinnedChats = filteredChats.filter(chat => !chat.isPinned);

  if (filteredChats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        {searchQuery ? 'No chats found' : 'No conversations yet'}
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="divide-y divide-gray-100">
        {pinnedChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChatId === chat.id}
            onClick={() => onChatSelect(chat.id)}
            isPinned={true}
          />
        ))}
        {unpinnedChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChatId === chat.id}
            onClick={() => onChatSelect(chat.id)}
            isPinned={false}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
