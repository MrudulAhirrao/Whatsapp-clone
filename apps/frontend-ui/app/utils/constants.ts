export const COLORS = {
  whatsappGreen: '#25D366',
  whatsappGreenDark: '#128C7E',
  whatsappBlue: '#34B7F1',
  whatsappGray: '#F0F2F5',
  whatsappDarkGray: '#8696A0',
  backgroundDefault: '#F0F2F5',
  backgroundChat: '#E5DDD5',
  messageOutgoing: '#D9FDD3',
  messageIncoming: '#FFFFFF'
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  DOCUMENT: 'document'
} as const;

export const CHAT_EVENTS = {
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline'
} as const;