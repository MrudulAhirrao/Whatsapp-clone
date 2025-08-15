// src/data/mockData.ts
import { User, Chat, Message, Status } from '@/app/types';

export const currentUser: User = {
  id: 'current-user',
  name: 'You',
  phoneNumber: '+1234567890',
  about: 'Hey there! I am using WhatsApp.',
  isOnline: true,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current'
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '+1234567891',
    about: 'Available',
    isOnline: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phoneNumber: '+1234567892',
    about: 'Busy',
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  },
  {
    id: '3',
    name: 'Team Group',
    phoneNumber: '+1234567893',
    about: 'Work discussions',
    isOnline: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=team'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    phoneNumber: '+1234567894',
    about: 'At work',
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: '5',
    name: 'Mike Johnson',
    phoneNumber: '+1234567895',
    about: 'Sleeping',
    isOnline: false,
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: 'text',
    status: 'read'
  },
  {
    id: '2',
    senderId: 'current-user',
    content: 'I\'m doing great! Just working on a new project.',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: 'text',
    status: 'read'
  },
  {
    id: '3',
    senderId: '1',
    content: 'That sounds awesome! What kind of project?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'text',
    status: 'delivered'
  },
  {
    id: '4',
    senderId: 'current-user',
    content: 'Building a WhatsApp clone with Next.js and TypeScript!',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'text',
    status: 'sent'
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: [mockUsers[0]],
    lastMessage: mockMessages[3],
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
    isPinned: true,
    isMuted: false
  },
  {
    id: '2',
    participants: [mockUsers[1]],
    lastMessage: {
      id: '5',
      senderId: '2',
      content: 'Can we meet tomorrow?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      status: 'delivered'
    },
    unreadCount: 2,
    isGroup: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    isPinned: false,
    isMuted: false
  },
  {
    id: '3',
    participants: [mockUsers[2], mockUsers[3], mockUsers[4]],
    lastMessage: {
      id: '6',
      senderId: '3',
      content: 'Great work everyone! 🎉',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    unreadCount: 5,
    isGroup: true,
    groupName: 'Team Project',
    groupAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TP',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    isPinned: false,
    isMuted: true
  },
  {
    id: '4',
    participants: [mockUsers[3]],
    lastMessage: {
      id: '7',
      senderId: 'current-user',
      content: 'Thanks for your help!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isPinned: false,
    isMuted: false
  }
];

export const mockStatuses: Status[] = [
  {
    id: '1',
    userId: '1',
    content: 'Having a great day!',
    mediaUrl: 'https://picsum.photos/400/600?random=1',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    viewedBy: [],
    isViewed: false
  },
  {
    id: '2',
    userId: '2',
    content: 'Working from home today',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    viewedBy: ['current-user'],
    isViewed: true
  },
  {
    id: '3',
    userId: 'current-user',
    content: 'My latest project',
    mediaUrl: 'https://picsum.photos/400/600?random=2',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    viewedBy: ['1', '2'],
    isViewed: false
  }
];