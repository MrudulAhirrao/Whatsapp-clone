export type { User } from './user';
export type { Message } from './message';
export type { Chat } from './chat';
export type { Status } from './status';

export interface SearchResult {
  type: 'chat' | 'message' | 'contact';
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  timestamp?: Date;
}