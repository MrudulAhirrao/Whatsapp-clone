'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera } from 'lucide-react';
import { User } from '@/app/types';

interface ProfileHeaderProps {
  user: User;
  onBack: () => void;
  onAvatarChange?: () => void;
}

export const ProfileHeader = ({ user, onBack, onAvatarChange }: ProfileHeaderProps) => {
  return (
    <>
      {/* Navigation Header */}
      <div className="flex items-center p-4 bg-[#00a884] text-white">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-white hover:bg-[#008f72] mr-4 p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">Profile</h1>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center py-8 bg-[#f0f2f5] border-b">
        <div className="relative group">
          <Avatar className="h-48 w-48 transition-all duration-200 group-hover:brightness-75">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-6xl bg-[#ddd] text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Camera Button */}
          <Button 
            onClick={onAvatarChange}
            className="absolute bottom-2 right-2 rounded-full h-12 w-12 bg-[#00a884] hover:bg-[#008f72] shadow-lg transition-all duration-200 hover:scale-105"
            size="sm"
          >
            <Camera className="h-6 w-6 text-white" />
          </Button>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-sm font-medium">Change Photo</div>
          </div>
        </div>
      </div>
    </>
  );
};