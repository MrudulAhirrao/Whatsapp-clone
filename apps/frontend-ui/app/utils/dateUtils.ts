export const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const messageDate = new Date(date);
  
  const isToday = now.toDateString() === messageDate.toDateString();
  const isYesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() === messageDate.toDateString();
  
  if (isToday) {
    return messageDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    const daysDiff = Math.floor((now.getTime() - messageDate.getTime()) / (24 * 60 * 60 * 1000));
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit' 
      });
    }
  }
};

export const formatLastSeen = (lastSeen: Date): string => {
  const now = new Date();
  const diff = now.getTime() - lastSeen.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'last seen just now';
  if (minutes < 60) return `last seen ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `last seen ${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 1) return 'last seen yesterday';
  if (days < 7) return `last seen ${days} days ago`;
  
  return `last seen ${lastSeen.toLocaleDateString()}`;
};