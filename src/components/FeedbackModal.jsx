import React, { useState } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      rating,
      feedbackType,
      feedback,
      timestamp: new Date().toISOString()
    });

    // Reset form and close modal
    setRating(0);
    setFeedback('');
    setFeedbackType('general');
    onClose();

    // Show success message (you could replace this with a proper toast notification)
    alert('Thank you for your feedback!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share Your Feedback</h2>
          <button onClick={onClose} className="modal-close">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="feedback-section">
            <label>How would you rate your experience?</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>

          <div className="feedback-section">
            <label htmlFor="feedback-type">Feedback Type</label>
            <select
              id="feedback-type"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="feedback-select"
            >
              <option value="general">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="usability">Usability Issue</option>
              <option value="performance">Performance Issue</option>
            </select>
          </div>

          <div className="feedback-section">
            <label htmlFor="feedback-text">Your Feedback</label>
            <textarea
              id="feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think... What worked well? What could be improved?"
              rows={4}
              className="feedback-textarea"
              required
            />
          </div>

          <div className="modal-actions">
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
