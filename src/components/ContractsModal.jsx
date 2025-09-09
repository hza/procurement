import React, { useEffect, useState } from 'react';
import { FaTimes, FaFileAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  // Sort state
  const [sortBy, setSortBy] = useState('date');

  // Status filter state - now supports multiple selections
  const [statusFilter, setStatusFilter] = useState(['all']);

  // Status filter dropdown state
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 contracts per page

  // Filter contracts based on search term and status
  const filteredContracts = contractFiles.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter.includes('all') || statusFilter.includes(contract.status.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  // Sort filtered contracts
  const sortedContracts = [...filteredContracts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date); // Newest first
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContracts = sortedContracts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsStatusDropdownOpen(false);
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

  // Handle click outside to close status dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isStatusDropdownOpen && !event.target.closest('.multiselect-container')) {
        setIsStatusDropdownOpen(false);
      }
    };

    if (isStatusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStatusDropdownOpen]);

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
            <div className="status-filter-wrapper">
              <div className="multiselect-container">
                <button
                  type="button"
                  className="multiselect-button"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span className="multiselect-text">
                    {statusFilter.includes('all') ? 'All Status' :
                     statusFilter.length === 0 ? 'Select Status' :
                     statusFilter.length === 1 ? statusFilter[0].charAt(0).toUpperCase() + statusFilter[0].slice(1) :
                     `${statusFilter.length} Selected`}
                  </span>
                  <span className={`multiselect-arrow ${isStatusDropdownOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isStatusDropdownOpen && (
                  <div className="multiselect-dropdown">
                    <label className="multiselect-option">
                      <input
                        type="checkbox"
                        checked={statusFilter.includes('all')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStatusFilter(['all']);
                          } else {
                            setStatusFilter([]);
                          }
                        }}
                      />
                      <span>All Status</span>
                    </label>

                    {['done', 'negotiations', 'review'].map(status => (
                      <label key={status} className="multiselect-option">
                        <input
                          type="checkbox"
                          checked={statusFilter.includes(status)}
                          onChange={(e) => {
                            if (statusFilter.includes('all')) {
                              // If "all" was selected, replace with specific status
                              setStatusFilter([status]);
                            } else if (e.target.checked) {
                              // Add status to selection
                              setStatusFilter([...statusFilter, status]);
                            } else {
                              // Remove status from selection
                              const newFilter = statusFilter.filter(s => s !== status);
                              setStatusFilter(newFilter.length === 0 ? ['all'] : newFilter);
                            }
                          }}
                        />
                        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="sort-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Newest First</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
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
                ({sortedContracts.length} contracts)
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
