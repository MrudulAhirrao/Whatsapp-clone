// In services/api.ts (Corrected)

import { Chat, Message, User } from "@/app/types"; // Assuming types are in an index file or similar

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

// ===== API service for conversations =====
export const conversationApi = {
  async getConversations() {
    try {
      // Added { cache: 'no-store' } to prevent browser caching issues
      const response = await fetch(`${API_BASE_URL}/api/conversations`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.warn('Unexpected conversations response:', data);
        return { data: [], error: null };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return { data: [], error: (error as Error).message };
    }
  }
};

// ===== API service for messages =====
export const messageApi = {
  async getMessages(conversationId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${conversationId}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.warn('Unexpected messages response:', data);
        return { data: [], error: null };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { data: [], error: (error as Error).message };
    }
  },

  async sendMessage(conversationId: string, content: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          content: content.trim()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('Error sending message:', error);
      return { data: null, error: (error as Error).message };
    }
  }
};

// ===== Helper function to transform backend data to frontend types =====
export const transformConversation = (backendConversation: any): Chat => {
  if (!backendConversation || typeof backendConversation !== 'object') {
    console.warn('Invalid backend conversation:', backendConversation);
    return emptyConversation();
  }

  const senderName = backendConversation.sender_name || 'Unknown';
  const lastMessageTimestamp = new Date(backendConversation.last_message_timestamp);

  return {
    id: backendConversation._id,
    participants: [
      {
        id: backendConversation._id, 
        name: senderName,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(senderName)}`,
        isOnline: false,
        phoneNumber: backendConversation._id,
        lastSeen: new Date(),
      }
    ],
    lastMessage: {
      id: backendConversation._id + Date.now(),
      senderId: backendConversation._id,
      content: backendConversation.last_message,
      timestamp: lastMessageTimestamp,
      type: 'text' as const,
      status: 'read' as const
    },
    unreadCount: 0,
    updatedAt: lastMessageTimestamp,
    isGroup: false, createdAt: new Date(), isPinned: false, isMuted: false,
  };
};

const emptyConversation = (): Chat => ({
  id: '',
  participants: [],
  lastMessage: undefined, // **FIXED:** Changed null to undefined
  unreadCount: 0,
  isGroup: false,
  groupName: undefined,
  groupAvatar: undefined,
  createdAt: new Date(), // **FIXED:** Changed null to a default Date
  updatedAt: new Date(), // **FIXED:** Changed null to a default Date
  isPinned: false,
  isMuted: false
});

export const transformMessage = (backendMessage: any): Message => {
  if (!backendMessage || typeof backendMessage !== 'object') {
    console.warn('Invalid backend message:', backendMessage);
    return emptyMessage();
  }

  return {
    id: backendMessage._id || Date.now().toString(),
    senderId: backendMessage.direction === 'outgoing' ? 'current-user' : (backendMessage.sender_name || 'Unknown'),
    content: backendMessage.content || '',
    timestamp: backendMessage.timestamp ? new Date(backendMessage.timestamp) : new Date(),
    type: 'text' as const,
    status: backendMessage.status || ('sent' as const)
  };
};

const emptyMessage = (): Message => ({
  id: Date.now().toString(),
  senderId: 'current-user',
  content: '',
  timestamp: new Date(),
  type: 'text' as const,
  status: 'sent' as const
});