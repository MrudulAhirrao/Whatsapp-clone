'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { ChatList } from '@/components/chat/ChatList';
import { ProfilePanel } from '@/components/profile/ProfilePanel';
import { StatusList } from '@/components/status/StatusList';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, MessageCircle, Users, Settings, User } from 'lucide-react';
import { Chat } from '@/app/types';
import { currentUser } from '@/app/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  loading?: boolean;
}

type SidebarView = 'chats' | 'status' | 'profile' | 'settings';

export const Sidebar = ({
  chats,
  selectedChatId,
  onChatSelect,
  searchQuery,
  onSearchChange,
  loading
}: SidebarProps) => {
  const [currentView, setCurrentView] = useState<SidebarView>('chats');

  const handleViewChange = (view: SidebarView) => {
    setCurrentView(view);
  };

  const safeChats = Array.isArray(chats)
    ? chats.filter(chat => chat && Array.isArray(chat.participants))
    : [];

  const renderContent = () => {
    switch (currentView) {
      case 'chats':
        return (
          <>
            <SearchBar value={searchQuery} onChange={onSearchChange} />
            <ChatList
              chats={safeChats}
              selectedChatId={selectedChatId}
              onChatSelect={onChatSelect}
              searchQuery={searchQuery}
              loading={loading}
            />
          </>
        );
      case 'status':
        return <StatusList onBack={() => setCurrentView('chats')} />;
      case 'profile':
        return <ProfilePanel user={currentUser} onBack={() => setCurrentView('chats')} />;
      case 'settings':
        return <SettingsPanel onBack={() => setCurrentView('chats')} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#f0f2f5] border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={() => handleViewChange('status')}>
            <Users className="h-5 w-5 text-[#54656f]" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-5 w-5 text-[#54656f]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-5 w-5 text-[#54656f]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleViewChange('profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewChange('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};
