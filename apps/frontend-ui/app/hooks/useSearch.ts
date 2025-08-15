'use client';

import { useState, useMemo } from 'react';
import { SearchResult } from '@/app/types';
import { mockChats, mockUsers, mockMessages } from '@/app/data/mockData';

export const useSearch = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search chats
    mockChats.forEach(chat => {
      const chatName = chat.isGroup ? chat.groupName || '' : chat.participants[0]?.name || '';
      if (chatName.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'chat',
          id: chat.id,
          title: chatName,
          subtitle: chat.lastMessage?.content || '',
          avatar: chat.isGroup ? chat.groupAvatar : chat.participants[0]?.avatar,
          timestamp: chat.lastMessage?.timestamp
        });
      }
    });

    // Search contacts
    mockUsers.forEach(user => {
      if (user.name.toLowerCase().includes(lowerQuery) || 
          user.phoneNumber.includes(query)) {
        results.push({
          type: 'contact',
          id: user.id,
          title: user.name,
          subtitle: user.about || user.phoneNumber,
          avatar: user.avatar
        });
      }
    });

    // Search messages
    mockMessages.forEach(message => {
      if (message.content.toLowerCase().includes(lowerQuery)) {
        const sender = mockUsers.find(u => u.id === message.senderId);
        results.push({
          type: 'message',
          id: message.id,
          title: sender?.name || 'Unknown',
          subtitle: message.content,
          avatar: sender?.avatar,
          timestamp: message.timestamp
        });
      }
    });

    return results;
  }, [query]);

  return {
    query,
    setQuery,
    searchResults,
    clearSearch: () => setQuery('')
  };
};