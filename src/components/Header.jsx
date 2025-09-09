import React, { useRef, useState, useEffect } from 'react';
import { FaUserCircle, FaUpload, FaBars, FaChevronDown } from 'react-icons/fa';
import ContractsModal from './ContractsModal';

const Header = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [showContractsModal, setShowContractsModal] = useState(false);
  const [showWorkflowMenu, setShowWorkflowMenu] = useState(false);
  const workflowMenuRef = useRef(null);

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

  // Close workflow menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (workflowMenuRef.current && !workflowMenuRef.current.contains(event.target)) {
        setShowWorkflowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
          <button onClick={() => handleNav('contracts')}>Contracts</button>
          <button onClick={() => handleNav('administration')}>Administration</button>
          <button onClick={() => handleNav('settings')}>Settings</button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="workflow-menu-container" ref={workflowMenuRef}>
          <button
            onClick={() => setShowWorkflowMenu(!showWorkflowMenu)}
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
      />
    </header>
  );
};

export default Header;
