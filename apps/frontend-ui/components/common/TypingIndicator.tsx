'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  isTyping: boolean;
  userName?: string;
  className?: string;
}

export const TypingIndicator = ({ isTyping, userName, className }: TypingIndicatorProps) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setDots(prev => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [isTyping]);

  if (!isTyping) return null;

  return (
    <div className={cn("flex items-center space-x-2 p-2", className)}>
      <div className="flex space-x-1">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              dot <= dots ? "bg-[#00a884]" : "bg-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-[#00a884] font-medium">
        {userName ? `${userName} is typing` : 'typing'}...
      </span>
    </div>
  );
};