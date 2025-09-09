import React, { useEffect } from 'react';
import { FaTimes, FaFileAlt, FaDownload, FaTrash } from 'react-icons/fa';

const ContractsModal = ({ isOpen, onClose, onDownloadFile, onDeleteFile }) => {
  // Sample contract files data
  const contractFiles = [
    { id: 1, name: 'Office Supply Contract', date: '2025-09-08', status: 'Done' },
    { id: 2, name: 'IT Services Agreement', date: '2025-09-05', status: 'Negotiations' },
    { id: 3, name: 'Facility Lease Contract', date: '2025-09-01', status: 'Review' },
    { id: 4, name: 'Vendor Partnership Agreement', date: '2025-08-28', status: 'Done' },
    { id: 5, name: 'Software License Contract', date: '2025-08-25', status: 'Negotiations' },
    { id: 6, name: 'Consulting Services Agreement', date: '2025-08-20', status: 'Review' }
  ];

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
          <h2>Contracts</h2>
          <button className="modal-close" onClick={onClose}>
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
                    {file.date} •
                    <span className={`status ${file.status.toLowerCase()}`}>
                      {file.status}
                    </span>
                  </div>
                </div>
                <div className="file-actions">
                  <button
                    className="file-action-btn download"
                    onClick={() => onDownloadFile(file.id)}
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    className="file-action-btn delete"
                    onClick={() => onDeleteFile(file.id)}
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
  );
};

export default ContractsModal;
