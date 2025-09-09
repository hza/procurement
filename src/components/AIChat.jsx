import React, { useState, useEffect } from 'react';

const AIChat = ({ setInputText }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant for contract analysis. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Effect to handle external input setting
  useEffect(() => {
    if (setInputText) {
      setInputText((text) => {
        setInputValue(text);
      });
    }
  }, [setInputText]);

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
              <path d="M12.7 5.3l4.6 4.6c.4.4.4 1 0 1.4s-1 .4-1.4 0L13 8.4V19c0 .6-.4 1-1 1s-1-.4-1-1V8.4l-2.9 2.9c-.4.4-1 .4-1.4 0-.2-.2-.3-.5-.3-.7 0-.2.1-.5.3-.7l4.6-4.6c.4-.4 1-.4 1.4 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
