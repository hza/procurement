import React, { useState, useEffect, useRef } from 'react';

const AIChat = ({ setInputText }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant for contract analysis. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea function
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Effect to handle external input setting
  useEffect(() => {
    if (setInputText) {
      setInputText((text) => {
        setInputValue(text);
        // Auto-resize after setting text
        setTimeout(autoResize, 0);
      });
    }
  }, [setInputText]);

  // Auto-resize when input value changes
  useEffect(() => {
    autoResize();
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
      setIsThinking(true);

      // Simulate AI response
      setTimeout(() => {
        setIsThinking(false);
        const aiResponse = {
          id: messages.length + 2,
          text: "The system is not connected to an AI backend yet. This requires buying credits from OpenAI.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000); // Increased delay to show thinking effect
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
        {isThinking && (
          <div className="chat-message ai thinking">
            <div className="message-content">
              <div className="thinking-indicator">
                <span className="thinking-dot"></span>
                <span className="thinking-dot"></span>
                <span className="thinking-dot"></span>
                <span className="thinking-text">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about contract ..."
            className="chat-input"
            rows="1"
          />
        </div>
        <div className="button-row">
          <div className="select-group">
            <select className="action-select">
              <option value="edit">Edit</option>
              <option value="ask">Ask</option>
            </select>
            <select className="action-select">
              <option value="edit">GPT-5</option>
              <option value="edit">GPT-4o</option>
              <option value="edit">GPT-5 mini</option>
            </select>
          </div>
          <button 
            onClick={handleSendMessage} 
            className="send-button"
            disabled={!inputValue.trim()}
            title="Send message"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12.7 5.3l4.6 4.6c.4.4.4 1 0 1.4s-1 .4-1.4 0L13 8.4V19c0 .6-.4 1-1 1s-1-.4-1-1V8.4l-2.9 2.9c-.4.4-1 .4-1.4 0-.2-.2-.3-.5-.3-.7 0-.2.1-.5.3-.7l4.6-4.6c.4-.4 1-.4 1.4 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
