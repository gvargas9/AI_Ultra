
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { styles, keyframes } from '../styles';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'image':
        return <img src={message.content} alt="Received" style={{ maxWidth: '100%', borderRadius: '8px' }} />;
      case 'video':
        return <video src={message.content} controls style={{ maxWidth: '100%', borderRadius: '8px' }} />;
      case 'audio':
        return <audio src={message.content} controls style={{ width: '100%' }} />;
      default:
        return message.text;
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={{
        ...styles.responseContainer,
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '1rem'
      }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            style={{
              ...styles.messageContainer,
              ...(message.role === 'assistant' ? styles.assistantMessage : styles.userMessage),
              marginBottom: '1rem'
            }}
          >
            {renderMessageContent(message)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
