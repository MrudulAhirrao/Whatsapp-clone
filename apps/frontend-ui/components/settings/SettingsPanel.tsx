'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Bell, Shield, Palette, Info, HelpCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsPanelProps {
  onBack: () => void;
}

export const SettingsPanel = ({ onBack }: SettingsPanelProps) => {
  const settingsItems = [
    { icon: User, label: 'Account', description: 'Security notifications, change number' },
    { icon: Shield, label: 'Privacy', description: 'Block contacts, disappearing messages' },
    { icon: Bell, label: 'Notifications', description: 'Message, group & call tones' },
    { icon: Palette, label: 'Theme', description: 'Light or dark theme' },
    { icon: HelpCircle, label: 'Help', description: 'Help center, contact us, privacy policy' },
    { icon: Info, label: 'About', description: 'Version info' }
  ];

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
        <h1 className="text-lg font-medium">Settings</h1>
      </div>

      {/* Settings List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {settingsItems.map((item) => (
            <div key={item.label} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <item.icon className="h-6 w-6 text-[#54656f] mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};