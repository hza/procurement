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
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about the contract..."
          className="chat-input"
          rows="2"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
