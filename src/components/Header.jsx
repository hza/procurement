import React, { useRef } from 'react';
import { FaUserCircle, FaUpload } from 'react-icons/fa';

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

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dfe1e6',
      height: '60px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 4px rgba(9, 30, 66, 0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/vite.svg" alt="Logo" style={{ height: '40px', width: '40px' }} />
        <span style={{ marginLeft: '12px', fontSize: '18px', fontWeight: '600', color: '#172b4d' }}>Procurement Review</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={handleUploadClick}
          className="upload-button"
        >
          <FaUpload />
          Upload Contract
        </button>
        <FaUserCircle size={32} color="#5e6c84" />
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
