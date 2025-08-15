'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OnlineStatus } from './OnlineStatus';
import { User } from '@/app/types';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnlineStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl'
};

export const UserAvatar = ({ 
  user, 
  size = 'md', 
  showOnlineStatus = false,
  className 
}: UserAvatarProps) => {
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(sizeClasses[size], "ring-2 ring-white shadow-sm")}>
        <AvatarImage 
          src={user.avatar} 
          alt={user.name}
          className="object-cover"
        />
        <AvatarFallback 
          className={cn(
            "bg-[#00a884] text-white font-medium",
            textSizeClasses[size]
          )}
        >
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {showOnlineStatus && (
        <OnlineStatus 
          isOnline={user.isOnline} 
          size={size === 'sm' ? 'sm' : 'md'} 
        />
      )}
    </div>
  );
};