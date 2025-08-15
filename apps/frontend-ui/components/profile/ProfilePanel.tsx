'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera, Edit, Check, X } from 'lucide-react';
import { User } from '@/app/types';

interface ProfilePanelProps {
  user: User;
  onBack: () => void;
}

export const ProfilePanel = ({ user, onBack }: ProfilePanelProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about || '');

  const handleSaveName = () => setIsEditingName(false);
  const handleSaveAbout = () => setIsEditingAbout(false);

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
        <h1 className="text-lg font-medium">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-8 bg-[#f0f2f5]">
          <div className="relative">
            <Avatar className="h-48 w-48">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-6xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button className="absolute bottom-2 right-2 rounded-full h-12 w-12 bg-[#00a884] hover:bg-[#008f72]">
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4 space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm text-[#00a884] font-medium">
              Your name
            </label>
            <div className="flex items-center justify-between mt-2">
              {isEditingName ? (
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSaveName}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setName(user.name);
                      setIsEditingName(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-lg">{name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This is not your username or pin. This name will be visible to
              your WhatsApp contacts.
            </p>
          </div>

          {/* About */}
          <div>
            <label className="text-sm text-[#00a884] font-medium">About</label>
            <div className="flex items-center justify-between mt-2">
              {isEditingAbout ? (
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSaveAbout}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setAbout(user.about || '');
                      setIsEditingAbout(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-lg">{about}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingAbout(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-[#00a884] font-medium">Phone</label>
            <div className="mt-2">
              <span className="text-lg">{user.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
