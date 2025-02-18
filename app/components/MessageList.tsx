
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
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      height: 'calc(100vh - 180px)',
      overflowY: 'auto',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {messages.map((message) => (
        <div 
          key={message.id}
          style={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: message.role === 'assistant' ? 'rgba(68, 70, 84, 0.3)' : 'transparent',
            width: '100%',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '0.25rem',
              backgroundColor: message.role === 'assistant' ? '#ffc000' : '#444654',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {message.role === 'assistant' ? 'AI' : 'U'}
            </div>
            <div style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#ececf1',
              whiteSpace: 'pre-wrap',
            }}>
              {renderMessageContent(message)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};
