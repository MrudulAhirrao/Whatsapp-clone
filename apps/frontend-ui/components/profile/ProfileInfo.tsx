'use client';

import { SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Check, X, User, Phone, Info } from 'lucide-react';
import { User as UserType } from '@/app/types';

interface ProfileInfoProps {
  user: UserType;
  onUpdate?: (field: string, value: string) => void;
}

interface EditableFieldProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  isEditable?: boolean;
  multiline?: boolean;
  placeholder?: string;
  description?: string;
  onSave?: (value: string) => void;
}

const EditableField = ({ 
  label, 
  value, 
  icon: Icon, 
  isEditable = true,
  multiline = false,
  placeholder,
  description,
  onSave 
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    if (editValue.trim() && editValue !== value) {
      onSave?.(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-[#00a884]" />
        <label className="text-sm text-[#00a884] font-medium">{label}</label>
      </div>
      
      <div className="flex items-start justify-between space-x-3">
        {isEditing ? (
          <div className="flex-1 space-y-2">
            <InputComponent
              value={editValue}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEditValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-base border-2 border-[#00a884] focus:border-[#00a884] focus:ring-[#00a884]"
              autoFocus
              rows={multiline ? 3 : undefined}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSave} className="bg-[#00a884] hover:bg-[#008f72]">
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="text-base text-gray-900 mb-1 break-words">
                {value || <span className="text-gray-400 italic">Not set</span>}
              </div>
              {description && (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {isEditable && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="hover:bg-gray-100 p-2"
              >
                <Edit className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const ProfileInfo = ({ user, onUpdate }: ProfileInfoProps) => {
  const handleFieldUpdate = (field: string, value: string) => {
    onUpdate?.(field, value);
  };

  return (
    <div className="p-6 space-y-8 bg-white">
      {/* Name Field */}
      <EditableField
        label="Your name"
        value={user.name}
        icon={User}
        placeholder="Enter your name"
        description="This is not your username or pin. This name will be visible to your WhatsApp contacts."
        onSave={(value) => handleFieldUpdate('name', value)}
      />

      {/* About Field */}
      <EditableField
        label="About"
        value={user.about || ''}
        icon={Info}
        multiline
        placeholder="Add something about yourself..."
        description="You can add a status message that your contacts can see."
        onSave={(value) => handleFieldUpdate('about', value)}
      />

      {/* Phone Field */}
      <EditableField
        label="Phone"
        value={user.phoneNumber}
        icon={Phone}
        isEditable={false}
        description="Your phone number cannot be changed here. Contact support if you need to update it."
      />

      {/* Additional Info Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div>
            <span className="font-medium">Joined:</span> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};