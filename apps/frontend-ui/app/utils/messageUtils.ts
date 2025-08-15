import { Message } from '@/app/types';

export const getMessageStatusIcon = (status: Message['status']): string => {
  switch (status) {
    case 'sent': return '✓';
    case 'delivered': return '✓✓';
    case 'read': return '✓✓'; // Will be blue in CSS
    default: return '';
  }
};

export const truncateMessage = (message: string, maxLength: number = 50): string => {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
};

export const isMessageFromCurrentUser = (message: Message, currentUserId: string): boolean => {
  return message.senderId === currentUserId;
};