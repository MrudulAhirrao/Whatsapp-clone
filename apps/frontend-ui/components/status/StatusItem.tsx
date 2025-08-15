'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Status } from '@/app/types';
import { formatMessageTime } from '@/app/utils/dateUtils';
import { mockUsers } from '@/app/data/mockData';
import { cn } from '@/lib/utils';

interface StatusItemProps {
  status: Status;
}

export const StatusItem = ({ status }: StatusItemProps) => {
  const user = mockUsers.find(u => u.id === status.userId);

  if (!user) return null;

  return (
    <div className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="relative">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Status ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2',
            status.isViewed ? 'border-gray-300' : 'border-[#00a884]'
          )}
        ></div>
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
          <span className="text-xs text-gray-500 ml-2">
            {formatMessageTime(status.timestamp)}
          </span>
        </div>

        <p className="text-sm text-gray-600 truncate">
          {status.mediaType ? `📷 Photo` : status.content}
        </p>
      </div>
    </div>
  );
};
