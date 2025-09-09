import React from 'react';
import { FaTimes, FaFileAlt, FaDownload, FaTrash } from 'react-icons/fa';

const ContractsModal = ({ isOpen, onClose, onDownloadFile, onDeleteFile }) => {
  // Sample contract files data
  const contractFiles = [
    { id: 1, name: 'Office_Supply_Contract_2025.pdf', size: '2.4 MB', date: '2025-09-08', status: 'Active' },
    { id: 2, name: 'IT_Services_Agreement.docx', size: '1.8 MB', date: '2025-09-05', status: 'Under Review' },
    { id: 3, name: 'Facility_Lease_Contract.pdf', size: '3.2 MB', date: '2025-09-01', status: 'Active' },
    { id: 4, name: 'Vendor_Partnership_Agreement.pdf', size: '1.5 MB', date: '2025-08-28', status: 'Expired' },
    { id: 5, name: 'Software_License_Contract.docx', size: '956 KB', date: '2025-08-25', status: 'Active' },
    { id: 6, name: 'Consulting_Services_Agreement.pdf', size: '2.1 MB', date: '2025-08-20', status: 'Under Review' }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contracts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contract Files</h2>
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
                    {file.size} • {file.date} •
                    <span className={`status ${file.status.toLowerCase().replace(' ', '-')}`}>
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
