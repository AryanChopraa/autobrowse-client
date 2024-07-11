'use client'
import React, { useEffect, useState } from 'react';

interface Message {
  type: string;
  content: string;
}

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/chat/');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      const initialMessage = { objective:'go to amazon and search for iphone 15 get me the price' };
      ws.send(JSON.stringify(initialMessage));

    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages(prevMessages => [...prevMessages, { type: 'system', content: data.message }]);
      }
      if (data.response) {
        setMessages(prevMessages => [...prevMessages, { type: 'ai', content: data.response }]);
      }
      if (data.screenshot) {
        setScreenshot(data.screenshot);
      }
      if (data.final_response) {
        setMessages(prevMessages => [...prevMessages, { type: 'final', content: data.final_response }]);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage) {
      socket.send(JSON.stringify({ message: inputMessage }));
      setMessages(prevMessages => [...prevMessages, { type: 'user', content: inputMessage }]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <strong>{message.type.toUpperCase()}:</strong> {message.content}
          </div>
        ))}
      </div>
      {screenshot && (
        <div className="screenshot-container">
          <img src={`data:image/jpeg;base64,${screenshot}`} alt="Current page" />
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;