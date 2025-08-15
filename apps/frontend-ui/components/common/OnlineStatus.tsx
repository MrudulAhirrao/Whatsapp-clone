'use client';

import { cn } from '@/lib/utils';

interface OnlineStatusProps {
  isOnline: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3'
};

export const OnlineStatus = ({ isOnline, size = 'md', className }: OnlineStatusProps) => {
  if (!isOnline) return null;
  
  return (
    <div 
      className={cn(
        "absolute bottom-0 right-0 rounded-full border-2 border-white",
        sizeClasses[size],
        isOnline ? "bg-green-500" : "bg-gray-400",
        className
      )}
      title={isOnline ? "Online" : "Offline"}
    />
  );
};