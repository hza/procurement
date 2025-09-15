import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState(`Please help us improve the application by answering these questions:

1. What type of contracts do you most frequently analyze?

2. Which features do you find most useful?

3. What features would you like to see added?

4. Did you encounter any issues or bugs?

5. Any other suggestions or feedback?

Thank you for your input!`);

  const textareaRef = useRef(null);

  // Add ESC key support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Small delay to ensure the modal is fully rendered
      setTimeout(() => {
        textareaRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      feedback,
      timestamp: new Date().toISOString()
    });

    // Reset form and close modal
    setFeedback(`Please help us improve the application by answering these questions:

1. What type of contracts do you most frequently analyze?

2. Which features do you find most useful?

3. What features would you like to see added?

4. Did you encounter any issues or bugs?

5. Any other suggestions or feedback?

Thank you for your input!`);
    onClose();

    // Show success message (you could replace this with a proper toast notification)
    alert('Thank you for your feedback!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content feedback-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          width: '600px', 
          maxWidth: '90vw', 
          minHeight: '500px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="modal-header">
          <h2>Share Your Feedback</h2>
          <button onClick={onClose} className="modal-close">
            <FaTimes />
          </button>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="feedback-form"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '20px'
          }}
        >
          <div 
            className="feedback-section"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <label htmlFor="feedback-text">Your Feedback</label>
            <textarea
              ref={textareaRef}
              id="feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please answer the questions below..."
              rows={8}
              className="feedback-textarea"
              style={{
                border: '2px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '14px',
                lineHeight: '1.5',
                width: '100%',
                resize: 'vertical',
                flex: 1,
                minHeight: '300px'
              }}
              required
            />
          </div>

          <div 
            className="modal-actions"
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: 'auto'
            }}
          >
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!feedback.trim()}>
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
