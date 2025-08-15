// In src/components/chat/MessageItem.tsx (Corrected)

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/app/types';
import { getMessageStatusIcon } from '@/app/utils/messageUtils';
import { formatMessageTime } from '@/app/utils/dateUtils';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  isFromCurrentUser: boolean;
  showAvatar: boolean;
}

export const MessageItem = ({ message, isFromCurrentUser, showAvatar }: MessageItemProps) => {
  // Removed dependency on mockUsers
  return (
    <div className={cn(
      "flex items-end space-x-2 mb-1",
      isFromCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isFromCurrentUser && showAvatar && (
        <Avatar className="h-8 w-8 mb-1">
          {/* We can add a real avatar source later */}
          <AvatarImage src={''} alt={'User Avatar'} />
          <AvatarFallback className="text-xs">U</AvatarFallback>
        </Avatar>
      )}
      
      {!isFromCurrentUser && !showAvatar && (
        <div className="w-8" />
      )}

      <div className={cn(
        "max-w-[65%] px-3 py-2 rounded-lg text-sm",
        isFromCurrentUser
          ? "bg-[#d9fdd3] text-gray-900 rounded-br-none"
          : "bg-white text-gray-900 rounded-bl-none shadow-sm"
      )}>
        <p className="break-words">{message.content}</p>
        <div className="flex items-center justify-end mt-1 space-x-1 text-gray-500">
          <span className="text-[10px]">
            {formatMessageTime(message.timestamp)}
          </span>
          {isFromCurrentUser && getMessageStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
};