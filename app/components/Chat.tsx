
import React, { useState } from 'react';

interface ChatProps {
  onSendMessage: (message: string) => void;
}

export const Chat: React.FC<ChatProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      try {
        const response = await fetch('/api/sql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: message,
            sessionId: Date.now()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message to N8N');
        }

        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '800px',
      display: 'flex',
      gap: '1rem',
      zIndex: 100,
      backgroundColor: 'rgba(64, 65, 79, 0.9)',
      padding: '0.75rem',
      borderRadius: '1rem',
      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: '1rem',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 192, 0, 0.2)',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '1rem 2rem',
          borderRadius: '1.5rem',
          border: 'none',
          background: '#ffc000',
          color: '#000',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Send
      </button>
    </form>
  );
};
