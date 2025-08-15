'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { StatusItem } from './StatusItem';
import { mockStatuses, currentUser } from '@/app/data/mockData';

interface StatusListProps {
  onBack: () => void;
}

export const StatusList = ({ onBack }: StatusListProps) => {
  const myStatuses = mockStatuses.filter(
    (status) => status.userId === currentUser.id
  );
  const otherStatuses = mockStatuses.filter(
    (status) => status.userId !== currentUser.id
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-[#00a884] text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-[#008f72] mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">Status</h1>
      </div>

      {/* Status Content */}
      <ScrollArea className="flex-1">
        {/* My Status */}
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
                <AvatarFallback>
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button className="absolute -bottom-1 -right-1 rounded-full h-7 w-7 bg-[#00a884] hover:bg-[#008f72] p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-medium">My status</h3>
              <p className="text-sm text-gray-500">
                {myStatuses.length > 0
                  ? 'Tap to add to your status'
                  : 'Add to your status'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        {otherStatuses.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-600">
                Recent updates
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {otherStatuses.map((status) => (
                <StatusItem key={status.id} status={status} />
              ))}
            </div>
          </div>
        )}

        {/* No Status Message */}
        {otherStatuses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              No recent updates
            </h3>
            <p className="text-sm text-gray-500 px-8">
              Status updates from your contacts will appear here
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
