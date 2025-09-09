import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
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
        <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>MVP App</span>
      </div>
      <div>
        <FaUserCircle size={30} />
      </div>
    </header>
  );
};

export default Header;
