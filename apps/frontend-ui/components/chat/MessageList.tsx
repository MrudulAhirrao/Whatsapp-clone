// In src/components/chat/MessageList.tsx (Corrected)

'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageItem } from './MessageItem';
import { Message } from '@/app/types';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4 py-2">
      <div className="space-y-1">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            // Logic updated to work with our API data structure
            isFromCurrentUser={message.senderId === 'current-user'}
            showAvatar={
              (message.senderId !== 'current-user') && 
              (index === 0 || messages[index - 1].senderId !== message.senderId)
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};