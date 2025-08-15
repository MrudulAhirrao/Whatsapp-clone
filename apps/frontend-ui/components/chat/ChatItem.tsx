'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Pin, VolumeX } from 'lucide-react';
import { Chat } from '@/app/types';
import { truncateMessage } from '@/app/utils/messageUtils';
import { formatMessageTime } from '@/app/utils/dateUtils';
import { currentUser } from '@/app/data/mockData';
import { cn } from '@/lib/utils';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
  isPinned: boolean;
}

export const ChatItem = ({ chat, isSelected, onClick, isPinned }: ChatItemProps) => {
  const displayName = chat.isGroup ? chat.groupName : chat.participants[0]?.name;
  const displayAvatar = chat.isGroup ? chat.groupAvatar : chat.participants[0]?.avatar;
  const displayInitials = displayName?.charAt(0) || '?';

  const isLastMessageFromCurrentUser = chat.lastMessage?.senderId === currentUser.id;
  const lastMessageContent = chat.lastMessage?.content || '';

  return (
    <div
      className={cn(
        "flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors",
        isSelected && "bg-[#f0f2f5]"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={displayAvatar} alt={displayName} />
          <AvatarFallback className="text-lg">{displayInitials}</AvatarFallback>
        </Avatar>
        
        {/* Online indicator for individual chats */}
        {!chat.isGroup && chat.participants[0]?.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate">{displayName}</h3>
          <div className="flex items-center space-x-1">
            {chat.lastMessage && (
              <span className="text-xs text-gray-500">
                {formatMessageTime(chat.lastMessage.timestamp)}
              </span>
            )}
            {isPinned && <Pin className="h-3 w-3 text-gray-400" />}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 min-w-0 flex-1">
            {isLastMessageFromCurrentUser && (
              <span className="text-gray-500 text-sm">You: </span>
            )}
            <p className="text-sm text-gray-600 truncate">
              {truncateMessage(lastMessageContent, 35)}
            </p>
            {chat.isMuted && <VolumeX className="h-3 w-3 text-gray-400" />}
          </div>
          
          {chat.unreadCount > 0 && (
            <Badge className="bg-[#25d366] hover:bg-[#25d366] text-white rounded-full h-5 min-w-[20px] text-xs px-1.5">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};