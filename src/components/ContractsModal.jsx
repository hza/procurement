import React, { useEffect, useState } from 'react';
import { FaTimes, FaFileAlt, FaDownload, FaTrash, FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ContractsModal = ({ isOpen, onClose, onDownloadFile, onDeleteFile, onNewContract, onSelectContract }) => {
  // Sample contract files data
  const contractFiles = [
    { id: 1, name: 'Office Supply Contract', date: '2025-09-08', status: 'Done' },
    { id: 2, name: 'IT Services Agreement', date: '2025-09-05', status: 'Negotiations' },
    { id: 3, name: 'Facility Lease Contract', date: '2025-09-01', status: 'Review' },
    { id: 4, name: 'Vendor Partnership Agreement', date: '2025-08-28', status: 'Done' },
    { id: 5, name: 'Software License Contract', date: '2025-08-25', status: 'Negotiations' },
    { id: 6, name: 'Consulting Services Agreement', date: '2025-08-20', status: 'Review' }
  ];

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 contracts per page

  // Filter contracts based on search term
  const filteredContracts = contractFiles.filter(contract =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContracts = filteredContracts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contracts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Open Contract</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search contracts by name or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="new-contract-btn" 
              onClick={onNewContract}
              title="Create New Contract"
            >
              <FaPlus />
              New Contract
            </button>
          </div>
          <div className="files-list">
            {currentContracts.map(file => (
              <div 
                key={file.id} 
                className="file-item clickable"
                onClick={() => onSelectContract && onSelectContract(file)}
              >
                <div className="file-icon">
                  <FaFileAlt />
                </div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-details">
                    {file.date} •
                    <span className={`status ${file.status.toLowerCase()}`}>
                      {file.status}
                    </span>
                  </div>
                </div>
                <div className="file-actions">
                  <button
                    className="file-action-btn download"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadFile(file.id);
                    }}
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    className="file-action-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(file.id);
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {currentContracts.length === 0 && searchTerm && (
              <div className="no-results">
                <p>No contracts found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination Controls - Fixed at bottom */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft style={{ marginRight: '6px' }} />
              Previous
            </button>

            <div className="pagination-info">
              <span>Page {currentPage} of {totalPages}</span>
              <span className="pagination-count">
                ({filteredContracts.length} contracts)
              </span>
            </div>

            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <FaChevronRight style={{ marginLeft: '6px' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractsModal;
