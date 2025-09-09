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
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
      height: '60px',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/vite.svg" alt="Logo" style={{ height: '40px', width: '40px' }} />
        <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>Procurement Review</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={handleUploadClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <FaUpload />
          Upload Contract
        </button>
        <FaUserCircle size={30} />
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
