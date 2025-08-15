'use client';

import { ChatWindow } from '@/components/chat/ChatWindow';
import { MessageCircle } from 'lucide-react';
import { Chat } from '@/app/types';

interface MainContentProps {
  selectedChat: Chat | null;
}

export const MainContent = ({ selectedChat }: MainContentProps) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f2f5] bg-[url('/whatsapp-bg.png')] bg-opacity-[0.06]">
        <div className="text-center text-[#41525d] max-w-md px-8">
          <div className="mb-8">
            <MessageCircle className="h-32 w-32 mx-auto text-[#d9dee0] mb-8" />
          </div>
          <h2 className="text-3xl font-light mb-4">WhatsApp Web</h2>
          <p className="text-sm mb-4">
            Send and receive messages without keeping your phone online.
          </p>
          <p className="text-xs text-[#8696a0]">
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>
      </div>
    );
  }

  return <ChatWindow chat={selectedChat} />;
};