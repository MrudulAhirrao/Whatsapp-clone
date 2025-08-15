// In src/hooks/useMessages.ts (Final Polished Version)

'use client';

import { useState, useCallback, useEffect } from 'react';
import { Message, Chat } from '@/app/types';
import { messageApi, transformMessage } from '@/app/services/api';

const CURRENT_USER_ID = 'current-user';
const randomReplies = ["That's interesting!", "Cool, thanks for letting me know.", "Okay, got it."];

export const useMessages = (chat: Chat | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chat) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await messageApi.getMessages(chat.id);
      
      if (error) {
        setError(error);
      } else {
        // --- THIS IS THE FINAL FIX ---
        if (data.length === 0) {
          // If the database has no messages for this chat,
          // check if a "lastMessage" exists on the chat object (for our simulation).
          setMessages(chat.lastMessage ? [chat.lastMessage] : []);
        } else {
          // If messages exist in the DB, show them.
          const transformedMessages = data.map(transformMessage);
          setMessages(transformedMessages);
        }
      }
      setLoading(false);
    };

    fetchMessages();
  }, [chat]);

  const sendMessage = useCallback(async (content: string) => {
    if (!chat) return;

    const optimisticMessage: Message = {
      id: `optimistic-${Date.now()}-${Math.random()}`,
      senderId: CURRENT_USER_ID,
      content,
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
    };
    setMessages(prev => [...prev, optimisticMessage]);

    const { data, error } = await messageApi.sendMessage(chat.id, content);

    if (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
    } else if (data) {
      const savedMessage = transformMessage(data);
      setMessages(prev => prev.map(msg => 
        msg.id === optimisticMessage.id ? savedMessage : msg
      ));
      
      setTimeout(() => {
        const replyContent = randomReplies[Math.floor(Math.random() * randomReplies.length)];
        const replyMessage: Message = {
          id: `simulated-${Date.now()}-${Math.random()}`,
          senderId: chat.id,
          content: replyContent,
          timestamp: new Date(),
          type: 'text',
          status: 'read',
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1500);
    }
  }, [chat]);

  return { messages, loading, error, sendMessage };
};