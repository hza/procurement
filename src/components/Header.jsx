import React, { useRef } from 'react';
import { FaUserCircle, FaUpload, FaBars } from 'react-icons/fa';

const Header = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

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
    console.log('Navigate to', section);
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
        <button
          onClick={handleMenuClick}
          className="menu-button"
          aria-label="Open menu"
          title="Menu"
        >
          <FaBars />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#172b4d' }}>Procurement Assistant</span>
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
          <FaUpload />
          Upload Contract
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
    </header>
  );
};

export default Header;
