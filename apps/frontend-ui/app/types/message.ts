export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio' | 'video' | 'document';
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
}

