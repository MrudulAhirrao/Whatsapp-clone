export interface User {
  id: string;
  name: string;
  avatar?: string;
  phoneNumber: string;
  about?: string;
  isOnline: boolean;
  lastSeen?: Date;
}