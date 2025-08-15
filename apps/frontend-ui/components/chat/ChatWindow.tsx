// In src/components/chat/ChatWindow.tsx (Corrected)

'use client';

import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Phone, VideoIcon } from 'lucide-react';
import { Chat } from '@/app/types';
import { useMessages } from '@/app/hooks/useMessages';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface ChatWindowProps {
  chat: Chat;
}

export const ChatWindow = ({ chat }: ChatWindowProps) => {
  // We now get our messages and sendMessage function from our powerful hook
  const { messages, loading, error, sendMessage } = useMessages(chat);
  
  const displayName = chat.isGroup ? chat.groupName : chat.participants[0]?.name;
  const displayAvatar = chat.isGroup ? chat.groupAvatar : chat.participants[0]?.avatar;
  
  return (
    <div className="flex flex-col h-full bg-[#efeae2]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-[#f0f2f5] border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback>{displayName?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-gray-900">{displayName}</h2>
            <p className="text-xs text-gray-500">last seen recently</p> {/* Placeholder */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm"><VideoIcon className="h-5 w-5 text-[#54656f]" /></Button>
          <Button variant="ghost" size="sm"><Phone className="h-5 w-5 text-[#54656f]" /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreVertical className="h-5 w-5 text-[#54656f]" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Contact info</DropdownMenuItem>
              <DropdownMenuItem>Clear messages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      {loading && <div className="flex-1 flex justify-center items-center">Loading messages...</div>}
      {error && <div className="flex-1 flex justify-center items-center text-red-500">Error: {error}</div>}
      {!loading && !error && <MessageList messages={messages} />}

      {/* Message Input - now connected to the real sendMessage function */}
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};