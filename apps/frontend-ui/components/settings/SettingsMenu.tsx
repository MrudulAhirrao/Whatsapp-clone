'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Moon, Sun, Volume2, Bell, Shield, Globe, Download, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SettingsMenuProps {
  onBack: () => void;
  currentTheme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection = ({ title, children }: SettingSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 px-6">{title}</h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

interface SettingItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingItem = ({ icon: Icon, title, description, action, onClick, danger }: SettingItemProps) => (
  <div 
    className={`flex items-center justify-between p-4 mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
      danger ? 'hover:bg-red-50' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <Icon className={`h-5 w-5 ${danger ? 'text-red-600' : 'text-[#54656f]'}`} />
      <div className="flex-1">
        <div className={`font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
          {title}
        </div>
        {description && (
          <div className="text-sm text-gray-500 mt-1">
            {description}
          </div>
        )}
      </div>
    </div>
    {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
  </div>
);

export const SettingsMenu = ({ onBack, currentTheme = 'light', onThemeChange }: SettingsMenuProps) => {
  const [notifications, setNotifications] = useState(true);
  const [messageSound, setMessageSound] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);
  const [mediaAutoDownload, setMediaAutoDownload] = useState(true);
  const [fontSize, setFontSize] = useState([14]);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all chat data? This cannot be undone.')) {
      // Clear data logic here
      console.log('Clearing data...');
    }
  };

  const handleExportChats = () => {
    // Export chats logic here
    console.log('Exporting chats...');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-[#00a884] text-white border-b">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-white hover:bg-[#008f72] mr-4 p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">Settings</h1>
      </div>

      {/* Settings Content */}
      <ScrollArea className="flex-1">
        <div className="space-y-8 py-6">
          
          {/* Appearance Section */}
          <SettingSection title="Appearance">
            <SettingItem
              icon={currentTheme === 'dark' ? Moon : Sun}
              title="Theme"
              description="Choose your preferred theme"
              action={
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Light</span>
                  <Switch
                    checked={currentTheme === 'dark'}
                    onCheckedChange={(checked) => onThemeChange?.(checked ? 'dark' : 'light')}
                  />
                  <span className="text-sm text-gray-600">Dark</span>
                </div>
              }
            />
            
            <div className="px-6 py-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Font Size</label>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500">A</span>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={18}
                    min={12}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-lg text-gray-500">A</span>
                </div>
                <div className="text-sm text-gray-500">Current: {fontSize[0]}px</div>
              </div>
            </div>
          </SettingSection>

          <Separator />

          {/* Notifications Section */}
          <SettingSection title="Notifications">
            <SettingItem
              icon={Bell}
              title="Desktop Notifications"
              description="Show notifications for new messages"
              action={
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              }
            />
            
            <SettingItem
              icon={Volume2}
              title="Message Sounds"
              description="Play sound for incoming messages"
              action={
                <Switch
                  checked={messageSound}
                  onCheckedChange={setMessageSound}
                />
              }
            />
          </SettingSection>

          <Separator />

          {/* Privacy Section */}
          <SettingSection title="Privacy">
            <SettingItem
              icon={Shield}
              title="Read Receipts"
              description="Send read receipts for messages"
              action={
                <Switch
                  checked={readReceipts}
                  onCheckedChange={setReadReceipts}
                />
              }
            />
            
            <SettingItem
              icon={Globe}
              title="Last Seen"
              description="Share your last seen timestamp"
              action={
                <Switch
                  checked={lastSeen}
                  onCheckedChange={setLastSeen}
                />
              }
            />
          </SettingSection>

          <Separator />

          {/* Media Section */}
          <SettingSection title="Media">
            <SettingItem
              icon={Download}
              title="Auto-download Media"
              description="Automatically download photos and videos"
              action={
                <Switch
                  checked={mediaAutoDownload}
                  onCheckedChange={setMediaAutoDownload}
                />
              }
            />
          </SettingSection>

          <Separator />

          {/* Data Section */}
          <SettingSection title="Data Management">
            <SettingItem
              icon={Download}
              title="Export Chat History"
              description="Download your chat history"
              onClick={handleExportChats}
            />
            
            <SettingItem
              icon={Trash2}
              title="Clear All Data"
              description="Remove all chats and media"
              onClick={handleClearData}
              danger
            />
          </SettingSection>

          {/* App Info */}
          <div className="px-6 py-4 text-center text-sm text-gray-500 border-t">
            <div>WhatsApp Web Clone</div>
            <div className="mt-1">Version 1.0.0</div>
            <div className="mt-2">Built with Next.js & TypeScript</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};