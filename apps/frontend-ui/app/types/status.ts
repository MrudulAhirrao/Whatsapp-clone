export interface Status {
  id: string;
  userId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: Date;
  viewedBy: string[];
  isViewed: boolean;
}