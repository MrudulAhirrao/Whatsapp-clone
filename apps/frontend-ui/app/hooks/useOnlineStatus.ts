'use client';

import { useState, useEffect } from 'react';
import { User } from '@/app/types';

export const useOnlineStatus = (users: User[]) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate online status changes
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const newOnlineUsers = new Set(prev);
        users.forEach(user => {
          // Random online/offline simulation
          if (Math.random() > 0.8) {
            if (newOnlineUsers.has(user.id)) {
              newOnlineUsers.delete(user.id);
            } else {
              newOnlineUsers.add(user.id);
            }
          }
        });
        return newOnlineUsers;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [users]);

  const isUserOnline = (userId: string) => onlineUsers.has(userId);

  return { isUserOnline, onlineUsers };
};