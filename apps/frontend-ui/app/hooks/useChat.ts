'use client';

import { useState, useCallback, useEffect } from 'react';
import { Chat } from '@/app/types';
import { conversationApi, transformConversation } from '@/app/services/api';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations from API
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await conversationApi.getConversations();
      
      if (error) {
        setError(error);
        return;
      }

      const transformedChats = data.map(transformConversation);
      setChats(transformedChats);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const selectChat = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
    // Mark messages as read (this would need to be implemented with API)
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    ));
  }, []);

  const refreshChats = useCallback(() => {
    fetchConversations();
  }, [fetchConversations]);

  const getSelectedChat = useCallback(() => {
    return chats.find(chat => chat.id === selectedChatId) || null;
  }, [chats, selectedChatId]);

  return {
    chats,
    selectedChatId,
    selectedChat: getSelectedChat(),
    loading,
    error,
    selectChat,
    refreshChats
  };
};
