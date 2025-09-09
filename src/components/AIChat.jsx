import React, { useState } from 'react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant for contract analysis. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "I understand your question about the contract. Let me analyze this for you...",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ai-chat-sidebar">
      <h3>AI Assistant</h3>
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <div className="input-wrapper">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about ..."
            className="chat-input"
            rows="1"
          />
          <button 
            onClick={handleSendMessage} 
            className="send-button"
            disabled={!inputValue.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M16.3 11.3l-4.6-4.6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.9 2.9H5c-.6 0-1 .4-1 1s.4 1 1 1h8.2l-2.9 2.9c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3l4.6-4.6c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
