'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  icon: Icon = MessageCircle, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      className
    )}>
      <div className="mb-6">
        <Icon className="h-16 w-16 text-gray-300 mx-auto" />
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && action}
    </div>
  );
};