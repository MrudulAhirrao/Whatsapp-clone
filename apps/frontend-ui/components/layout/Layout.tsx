// In src/components/layout/Layout.tsx (Final Version)

'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { Chat } from '@/app/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { conversationApi, transformConversation } from '@/app/services/api';
import { Button } from '../ui/button';

const randomNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];
const randomMessages = ["Hey, are you free later?", "Can we reschedule?", "Just checking in.", "Got the files, thanks!"];

export const Layout = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAndTransformChats = async () => {
      const { data, error } = await conversationApi.getConversations();
      if (error) {
        setError(error);
      } else {
        const transformedData = data.map(transformConversation);
        setChats(transformedData);
      }
      setLoading(false);
    };
    fetchAndTransformChats();
  }, []);

  // --- THIS IS THE NEW, COMBINED FUNCTION ---
  const handleSelectChat = (chatId: string) => {
    // First, select the chat so the main window can open
    setSelectedChatId(chatId);

    // Second, find that chat in the list and set its unreadCount to 0
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, unreadCount: 0 } 
          : chat
      )
    );
  };

  const simulateNewChat = () => {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomId = `simulated-${Date.now()}`;
    const randomLastMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    
    const newChat: Chat = {
      id: randomId,
      participants: [{
        id: randomId, name: randomName, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${randomName}`,
        phoneNumber: randomId, isOnline: true, lastSeen: new Date(),
      }],
      lastMessage: {
        id: randomId + Date.now(), content: randomLastMessage, senderId: randomId,
        timestamp: new Date(), type: 'text', status: 'delivered',
      },
      unreadCount: 1, // Start with 1 unread message
      updatedAt: new Date(),
      isGroup: false, createdAt: new Date(), isPinned: false, isMuted: false,
    };
    setChats(prevChats => [newChat, ...prevChats]);
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId) || null;

  if (loading) {
    return <div className="flex h-screen bg-[#111b21] items-center justify-center"><LoadingSpinner /></div>;
  }
  if (error) {
    return <div className="flex h-screen bg-[#111b21] items-center justify-center text-white">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-[#111b21]">
      <div className="w-[400px] bg-white border-r border-gray-300 flex flex-col">
        <div className="p-2 border-b">
          <Button onClick={simulateNewChat} className="w-full">
            Simulate New Chat
          </Button>
        </div>
        <Sidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onChatSelect={handleSelectChat} // <-- Pass the new function here
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <MainContent selectedChat={selectedChat} />
      </div>
    </div>
  );
};