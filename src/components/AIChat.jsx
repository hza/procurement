import React, { useState, useEffect, useRef } from 'react';

const AIChat = ({ setInputText, setResetChat, analyzerType }) => {
  const getInitialMessage = () => {
    if (analyzerType === 'negotiation') {
      return "Hello! I'm your AI Assistant. I can help you negotiate better terms for cost savings, payment improvements, and service levels. How can I assist with your contract negotiations?";
    }
    return "Hello! I'm your AI assistant for contract analysis. How can I help you today?";
  };

  const [messages, setMessages] = useState([
    { id: 1, text: getInitialMessage(), sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const textareaRef = useRef(null);

  // Auto-resize textarea function
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Effect to handle external input text setting
  useEffect(() => {
    if (setInputText) {
      setInputText((text) => {
        setInputValue(text);
        // Focus the textarea
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      });
    }
  }, [setInputText]);

  // Effect to set reset function
  useEffect(() => {
    if (setResetChat) {
      setResetChat(() => {
        setMessages([
          { id: 1, text: getInitialMessage(), sender: 'ai', timestamp: new Date() }
        ]);
        setInputValue('');
        setIsThinking(false);
        setTokenCount(0);
      });
    }
  }, [setResetChat, analyzerType]);

  // Auto-resize when input value changes
  useEffect(() => {
    autoResize();
  }, [inputValue]);

  // Calculate token count
  const calculateTokenCount = (messages) => {
    // Simple approximation: roughly 4 characters per token
    const totalText = messages.map(msg => msg.text).join(' ');
    return Math.ceil(totalText.length / 4);
  };

  // Update token count when messages change
  useEffect(() => {
    setTokenCount(200); // calculateTokenCount(messages)
  }, [messages]);

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
          text: "It looks like we've run out of tokens. To continue chatting, please purchase additional credits.",
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
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M12 2l4 10-4 10-4-10L12 2z M2 12l10-4 10 4-10 4L2 12z" />
          </svg>
          AI Assistant
        </div>
                <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          fontSize: '10px', 
          color: '#666', 
          fontWeight: 'normal'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd700" style={{ verticalAlign: 'middle' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              <circle cx="12" cy="12" r="8" fill="none" stroke="#ffd700" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="#ffd700" />
            </svg>
            AI used: {tokenCount} / 200
          </div>
          <a 
            href="#" 
            style={{ 
              fontSize: '9px', 
              color: '#1a73e8', 
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '0px'
            }}
            onClick={(e) => {
              e.preventDefault();
              alert('Token purchase feature coming soon!');
            }}
          >
            Add more tokens
          </a>
        </div>
      </h3>
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
            placeholder={analyzerType === 'negotiation' ? "Ask me about negotiation strategies..." : "Ask me anything about contract ..."}
            className="chat-input"
            rows="1"
          />
        </div>
        <div className="button-row">
          <div className="select-group">
            <select className="action-select">
              <option value="ask">Ask</option>
              <option value="edit">Edit</option>
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
              <path d="M12.7 5.3l4.6 4.6c.4.4.4 1 0 1.4s-1 .4-1.4 0L13 8.4V19c0 .6-.4 1-1 1s-1-.4-1-1V8.4l-2.9 2.9c-.4.4-1 .4-1.4 0-.2-.2-.3-.5-.3-.7 0-.2.1-.5.3-.7l4.6-4.6c.4-.4 1-.4 1.4 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
