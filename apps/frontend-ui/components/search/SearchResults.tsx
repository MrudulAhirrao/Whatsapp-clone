'use client';

import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchResult } from '@/app/types';
import { mockChats, mockUsers } from '@/app/data/mockData';
import { formatMessageTime } from '@/app/utils/dateUtils';

interface SearchResultsProps {
  query: string;
  onResultSelect: (result: SearchResult) => void;
}

export const SearchResults = ({ query, onResultSelect }: SearchResultsProps) => {
  const [selectedType, setSelectedType] = useState<'all' | 'chats' | 'contacts' | 'messages'>('all');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in chats
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

    // Search in contacts
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

    // Search in messages (simplified - in real app would search actual message content)
    if (lowerQuery.includes('project') || lowerQuery.includes('awesome')) {
      results.push({
        type: 'message',
        id: 'msg-1',
        title: 'John Doe',
        subtitle: 'That sounds awesome! What kind of project?',
        avatar: mockUsers[0].avatar,
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      });
    }

    return results;
  }, [query]);

  const typeMap: Record<'chats' | 'contacts' | 'messages', 'chat' | 'contact' | 'message'> = {
    chats: 'chat',
    contacts: 'contact',
    messages: 'message'
  };

  const filteredResults = selectedType === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === typeMap[selectedType as keyof typeof typeMap]);

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Filter tabs */}
      <div className="flex border-b bg-white px-3 py-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'chats', label: 'Chats' },
          { key: 'contacts', label: 'Contacts' },
          { key: 'messages', label: 'Messages' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedType(key as any)}
            className={`px-3 py-1 text-sm rounded-full mr-2 transition-colors ${
              selectedType === key 
                ? 'bg-[#00a884] text-white' 
                : 'text-[#54656f] hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <ScrollArea className="flex-1">
        {filteredResults.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p>No results found for "{query}"</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredResults.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                onClick={() => onResultSelect(result)}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={result.avatar} alt={result.title} />
                  <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 ml-3 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {result.title}
                    </h3>
                    {result.timestamp && (
                      <span className="text-xs text-gray-500 ml-2">
                        {formatMessageTime(result.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {result.subtitle}
                    </p>
                    <span className="text-xs text-gray-400 ml-2 capitalize">
                      {result.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};