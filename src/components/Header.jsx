import React, { useRef, useState } from 'react';
import { FaUserCircle, FaUpload, FaBars, FaTimes, FaFileAlt, FaDownload, FaTrash } from 'react-icons/fa';

const Header = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [showContractsModal, setShowContractsModal] = useState(false);

  // Sample contract files data
  const contractFiles = [
    { id: 1, name: 'Office_Supply_Contract_2025.pdf', size: '2.4 MB', date: '2025-09-08', status: 'Active' },
    { id: 2, name: 'IT_Services_Agreement.docx', size: '1.8 MB', date: '2025-09-05', status: 'Under Review' },
    { id: 3, name: 'Facility_Lease_Contract.pdf', size: '3.2 MB', date: '2025-09-01', status: 'Active' },
    { id: 4, name: 'Vendor_Partnership_Agreement.pdf', size: '1.5 MB', date: '2025-08-28', status: 'Expired' },
    { id: 5, name: 'Software_License_Contract.docx', size: '956 KB', date: '2025-08-25', status: 'Active' },
    { id: 6, name: 'Consulting_Services_Agreement.pdf', size: '2.1 MB', date: '2025-08-20', status: 'Under Review' }
  ];

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
    if (section === 'files') {
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

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 16px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dfe1e6',
      height: '48px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 4px rgba(9, 30, 66, 0.06)'
    }}>
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
          <button onClick={() => handleNav('files')}>Contracts</button>
          <button onClick={() => handleNav('reports')}>Negotiations</button>
          <button onClick={() => handleNav('settings')}>Settings</button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleUploadClick}
          className="upload-button"
        >
          Start Negotiations
        </button>
        <FaUserCircle size={28} color="#5e6c84" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".html,.txt,.md"
          style={{ display: 'none' }}
        />
      </div>

      {showContractsModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content contracts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Contract Files</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="files-list">
                {contractFiles.map(file => (
                  <div key={file.id} className="file-item">
                    <div className="file-icon">
                      <FaFileAlt />
                    </div>
                    <div className="file-info">
                      <div className="file-name">{file.name}</div>
                      <div className="file-details">
                        {file.size} • {file.date} •
                        <span className={`status ${file.status.toLowerCase().replace(' ', '-')}`}>
                          {file.status}
                        </span>
                      </div>
                    </div>
                    <div className="file-actions">
                      <button
                        className="file-action-btn download"
                        onClick={() => handleDownloadFile(file.id)}
                        title="Download"
                      >
                        <FaDownload />
                      </button>
                      <button
                        className="file-action-btn delete"
                        onClick={() => handleDeleteFile(file.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>

  );
};

export default Header;
