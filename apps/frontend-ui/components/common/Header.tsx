'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Search, Phone, VideoIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Chat } from '@/app/types';
import { formatLastSeen } from '@/app/utils/dateUtils';

interface HeaderProps {
  chat?: Chat | null;
  title?: string;
  subtitle?: string;
  avatar?: string;
  showActions?: boolean;
  onSearch?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMenuAction?: (action: string) => void;
}

export const Header = ({ 
  chat, 
  title, 
  subtitle, 
  avatar,
  showActions = true,
  onSearch,
  onCall,
  onVideoCall,
  onMenuAction 
}: HeaderProps) => {
  const displayName = chat?.isGroup ? chat.groupName : chat?.participants[0]?.name || title;
  const displayAvatar = chat?.isGroup ? chat.groupAvatar : chat?.participants[0]?.avatar || avatar;
  const displayInitials = displayName?.charAt(0)?.toUpperCase() || '?';
  
  const getSubtitle = () => {
    if (subtitle) return subtitle;
    if (!chat) return '';
    
    if (chat.isGroup) {
      return `${chat.participants.length} participants`;
    } else {
      const participant = chat.participants[0];
      if (participant?.isOnline) {
        return 'online';
      } else if (participant?.lastSeen) {
        return formatLastSeen(participant.lastSeen);
      }
      return 'offline';
    }
  };

  const handleMenuAction = (action: string) => {
    onMenuAction?.(action);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#f0f2f5] border-b border-gray-200">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
          <AvatarImage src={displayAvatar} alt={displayName} />
          <AvatarFallback className="bg-[#00a884] text-white font-medium">
            {displayInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-gray-900 truncate text-base">
            {displayName}
          </h2>
          <p className="text-sm text-[#667781] truncate">
            {getSubtitle()}
          </p>
        </div>
      </div>
      
      {showActions && (
        <div className="flex items-center space-x-1">
          {onVideoCall && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onVideoCall}
              className="text-[#54656f] hover:bg-gray-200 p-2"
              title="Video call"
            >
              <VideoIcon className="h-5 w-5" />
            </Button>
          )}
          
          {onCall && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCall}
              className="text-[#54656f] hover:bg-gray-200 p-2"
              title="Voice call"
            >
              <Phone className="h-5 w-5" />
            </Button>
          )}
          
          {onSearch && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSearch}
              className="text-[#54656f] hover:bg-gray-200 p-2"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#54656f] hover:bg-gray-200 p-2"
                title="Menu"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleMenuAction('contact-info')}>
                Contact info
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction('select-messages')}>
                Select messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction('mute')}>
                Mute notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction('clear')}>
                Clear messages
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleMenuAction('delete')}
                className="text-red-600 focus:text-red-600"
              >
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};