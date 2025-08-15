'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Mic, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="p-4 bg-[#f0f2f5] border-t">
      <div className="flex items-end space-x-2">
        {/* Attachment button */}
        <Button variant="ghost" size="sm" className="rounded-full p-2">
          <Paperclip className="h-5 w-5 text-[#54656f]" />
        </Button>

        {/* Message input container */}
        <div className="flex-1 bg-white rounded-lg flex items-end">
          {/* Emoji button */}
          <Button variant="ghost" size="sm" className="rounded-full p-2 m-1">
            <Smile className="h-5 w-5 text-[#54656f]" />
          </Button>

          {/* Text input */}
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 border-none focus:ring-0 focus:outline-none bg-transparent text-sm py-2 px-0 min-h-[24px] max-h-[100px] resize-none"
            style={{ boxShadow: 'none' }}
          />
        </div>

        {/* Send or Voice button */}
        {message.trim() ? (
          <Button 
            onClick={handleSend}
            className="rounded-full p-2 bg-[#00a884] hover:bg-[#008f72]"
            size="sm"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            onClick={handleVoiceRecord}
            variant="ghost" 
            size="sm" 
            className={cn(
              "rounded-full p-2",
              isRecording && "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};