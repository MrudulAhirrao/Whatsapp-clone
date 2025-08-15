import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isMuted: boolean;
}
