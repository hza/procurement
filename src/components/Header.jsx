import React, { useRef, useState, useEffect } from 'react';
import { FaUserCircle, FaUpload, FaBars, FaChevronDown, FaBell, FaComment } from 'react-icons/fa';
import ContractsModal from './OpenContract';
import NewContract from './NewContract';
import FeedbackModal from './FeedbackModal';

const Header = ({ onFileUpload, onContractCreate, showRecommendation, recommendationFading, onCloseRecommendation }) => {
  const fileInputRef = useRef(null);
  const [showContractsModal, setShowContractsModal] = useState(false);
  const [showWorkflowMenu, setShowWorkflowMenu] = useState(false);
  const [showContractsMenu, setShowContractsMenu] = useState(false);
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const workflowMenuRef = useRef(null);
  const contractsMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (onFileUpload) {
      onFileUpload(event);
    }
  };

  const handleMenuClick = () => {
    // Placeholder for future sidebar / navigation toggle
    console.log('Menu button clicked');
  };

  const handleNav = (section) => {
    if (section === 'contracts') {
      setShowContractsModal(true);
    } else {
      console.log('Navigate to', section);
    }
  };

  const handleCloseModal = () => {
    setShowContractsModal(false);
  };

  const handleDownloadFile = (fileId) => {
    console.log('Downloading file:', fileId);
    // In a real app, this would trigger a download
  };

  const handleDeleteFile = (fileId) => {
    console.log('Deleting file:', fileId);
    // In a real app, this would show a confirmation and delete
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside workflow menu
      if (workflowMenuRef.current && !workflowMenuRef.current.contains(event.target)) {
        setShowWorkflowMenu(false);
      }

      // Check if click is outside contracts menu
      if (contractsMenuRef.current && !contractsMenuRef.current.contains(event.target)) {
        setShowContractsMenu(false);
      }

      // Check if click is outside notifications
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    // Add both mouse and touch event listeners for better mobile support
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleStartNegotiation = () => {
    console.log('Starting negotiation...');
    setShowWorkflowMenu(false);
    // Add negotiation logic here
  };

  const handleCloseContract = () => {
    console.log('Closing contract...');
    setShowWorkflowMenu(false);
    // Add contract closure logic here
  };

  const handleNewContract = () => {
    console.log('Creating new contract...');
    // Add new contract creation logic here
    // For now, just close the modal
    setShowContractsModal(false);
  };

  const handleSelectContract = (contract) => {
    console.log('Selected contract:', contract);
    // Show not implemented alert
    alert('Not implemented');
    setShowContractsModal(false);
  };

  const handleNewContractFromMenu = () => {
    console.log('Creating new contract from menu...');
    setShowContractsMenu(false);
    setShowNewContractModal(true);
  };

  const handleCloseNewContractModal = () => {
    setShowNewContractModal(false);
  };

  const handleOpenContractFromMenu = () => {
    console.log('Opening contracts modal from menu...');
    setShowContractsMenu(false);
    setShowContractsModal(true);
  };

  const handleContractsMenuToggle = () => {
    setShowContractsMenu(!showContractsMenu);
    // Close workflow menu when opening contracts menu
    if (!showContractsMenu) {
      setShowWorkflowMenu(false);
    }
  };

  const handleWorkflowMenuToggle = () => {
    setShowWorkflowMenu(!showWorkflowMenu);
    // Close contracts menu when opening workflow menu
    if (!showWorkflowMenu) {
      setShowContractsMenu(false);
    }
  };

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
    // Close other menus when opening notifications
    if (!showNotifications) {
      setShowWorkflowMenu(false);
      setShowContractsMenu(false);
    }
  };

  const handleFeedbackClick = () => {
    setShowFeedbackModal(true);
    // Close other menus when opening feedback
    setShowWorkflowMenu(false);
    setShowContractsMenu(false);
    setShowNotifications(false);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="logo-container">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="24" height="20" rx="2" fill="#0052cc" stroke="#0052cc" strokeWidth="1" />
            <rect x="8" y="10" width="16" height="2" fill="#ffffff" />
            <rect x="8" y="14" width="12" height="2" fill="#ffffff" />
            <rect x="8" y="18" width="16" height="2" fill="#ffffff" />
            <rect x="8" y="22" width="8" height="2" fill="#ffffff" />
            <circle cx="20" cy="20" r="3" fill="#4c9aff" />
            <path d="M18 20L19.5 21.5L22 19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">Procurement Assistant</span>
        </div>
        <nav className="main-nav">
          <div className="contracts-menu-container" ref={contractsMenuRef}>
            <button
              onClick={handleContractsMenuToggle}
              className="contracts-button"
            >
              Contracts
              <FaChevronDown size={12} style={{ marginLeft: '6px' }} />
            </button>
            {showContractsMenu && (
              <div className="contracts-dropdown">
                <button onClick={handleNewContractFromMenu} className="contracts-option">
                  New Contract
                </button>
                <button onClick={handleOpenContractFromMenu} className="contracts-option">
                  Open Contract ...
                </button>
                <button onClick={() => alert('Not impl')} className="contracts-option">
                  Import from file ...
                </button>
                <button onClick={() => alert('Not impl')} className="contracts-option">
                  Export to file ...
                </button>
                <button onClick={() => alert('Not impl')} className="contracts-option">
                  Manage Contracts ...
                </button>
                <button onClick={() => alert('Not impl')} className="contracts-option">
                  View Feedbacks ...
                </button>
              </div>
            )}
          </div>
          <button onClick={() => handleNav('administration')}>Administration</button>
          <button onClick={() => handleNav('settings')}>Settings</button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleFeedbackClick}
          className="feedback-button"
          title="Share Feedback"
        >
          <FaComment size={16} style={{ marginRight: '6px' }} />
          Feedback
        </button>
        <div className="workflow-menu-container" ref={workflowMenuRef}>
          <button
            onClick={handleWorkflowMenuToggle}
            className="workflow-button"
          >
            Workflow
            <FaChevronDown size={12} style={{ marginLeft: '6px' }} />
          </button>
          {showWorkflowMenu && (
            <div className="workflow-dropdown">
              <button onClick={handleStartNegotiation} className="workflow-option">
                Start Negotiation
              </button>
              <button onClick={handleCloseContract} className="workflow-option">
                Close Contract
              </button>
            </div>
          )}
        </div>
        <div className="notifications-container" ref={notificationsRef}>
          <button
            onClick={handleNotificationsToggle}
            className="notifications-button"
            title="Notifications"
          >
            <FaBell size={20} color="#5e6c84" />
            {showRecommendation && <span className="notification-dot"></span>}
          </button>
          {showNotifications && showRecommendation && (
            <div className={`notifications-dropdown ${recommendationFading ? 'fading' : ''}`}>
              <div className="notification-item">
                <button
                  onClick={onCloseRecommendation}
                  className="notification-close"
                  title="Dismiss"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="notification-content">
                  <p><em>⚠️ Warning: This contract contains numerous one-sided provisions that heavily favor the seller. We strongly recommend consulting with legal counsel before signing.</em></p>
                </div>
              </div>
            </div>
          )}
        </div>
        <FaUserCircle size={28} color="#5e6c84" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".html,.txt,.md"
          style={{ display: 'none' }}
        />
      </div>

      <ContractsModal
        isOpen={showContractsModal}
        onClose={handleCloseModal}
        onDownloadFile={handleDownloadFile}
        onDeleteFile={handleDeleteFile}
        onNewContract={handleNewContract}
        onSelectContract={handleSelectContract}
      />

      <NewContract
        isOpen={showNewContractModal}
        onClose={handleCloseNewContractModal}
        onContractCreate={onContractCreate}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleCloseFeedbackModal}
      />
    </header>
  );
};

export default Header;
