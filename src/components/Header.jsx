import React, { useRef, useState, useEffect } from 'react';
import { FaUserCircle, FaUpload, FaBars, FaChevronDown, FaTimes, FaFileContract, FaFileAlt, FaHandshake, FaBuilding, FaTools } from 'react-icons/fa';
import ContractsModal from './ContractsModal';

const Header = ({ onFileUpload, onContractCreate }) => {
  const fileInputRef = useRef(null);
  const [showContractsModal, setShowContractsModal] = useState(false);
  const [showWorkflowMenu, setShowWorkflowMenu] = useState(false);
  const [showContractsMenu, setShowContractsMenu] = useState(false);
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const workflowMenuRef = useRef(null);
  const contractsMenuRef = useRef(null);

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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside workflow menu
      if (workflowMenuRef.current && !workflowMenuRef.current.contains(event.target)) {
        setShowWorkflowMenu(false);
      }

      // Check if click is outside contracts menu
      if (contractsMenuRef.current && !contractsMenuRef.current.contains(event.target)) {
        setShowContractsMenu(false);
      }
    };

    // Add both mouse and touch event listeners for better mobile support
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
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

  const handleSelectContract = (contract) => {
    console.log('Selected contract:', contract);
    // Add contract selection logic here
    // For example, open contract details or load contract content
    setShowContractsModal(false);
  };

  const handleNewContractFromMenu = () => {
    console.log('Creating new contract from menu...');
    setShowContractsMenu(false);
    setShowNewContractModal(true);
  };

  const handleCloseNewContractModal = () => {
    setShowNewContractModal(false);
  };

  const handleCreateBlankContract = () => {
    setShowNewContractModal(false);
    // Create a blank contract
    const newContract = {
      id: Date.now().toString(),
      title: 'New Contract',
      content: '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'blank'
    };
    if (onContractCreate) {
      onContractCreate(newContract);
    }
  };

  const handleCreateFromTemplate = (templateType) => {
    setShowNewContractModal(false);
    // Create contract from template
    const templates = {
      'service-agreement': {
        title: 'Service Agreement Contract',
        content: `# Service Agreement Contract

## Parties Involved
- **Service Provider:** [Provider Name]
- **Client:** [Client Name]

## Services Provided
[Describe the services to be provided]

## Term and Termination
- **Effective Date:** [Start Date]
- **Term Length:** [Duration]
- **Termination Conditions:** [Conditions]

## Payment Terms
- **Rate:** [Payment Amount]
- **Frequency:** [Payment Schedule]
- **Method:** [Payment Method]

## Signatures
Service Provider: ___________________________ Date: __________

Client: ___________________________ Date: __________`
      },
      'supply-contract': {
        title: 'Supply Contract',
        content: `# Supply Contract

## Parties
- **Supplier:** [Supplier Name]
- **Buyer:** [Buyer Name]

## Products/Services
[Detail the products or services to be supplied]

## Delivery Terms
- **Delivery Schedule:** [Timeline]
- **Shipping Method:** [Method]
- **Delivery Location:** [Address]

## Pricing and Payment
- **Unit Price:** [Price per unit]
- **Total Value:** [Total amount]
- **Payment Terms:** [Net 30, etc.]

## Quality Standards
[Specify quality requirements and inspection procedures]

## Signatures
Supplier: ___________________________ Date: __________

Buyer: ___________________________ Date: __________`
      },
      'facility-lease': {
        title: 'Facility Lease Agreement',
        content: `# Facility Lease Agreement

## Landlord and Tenant
- **Landlord:** [Landlord Name]
- **Tenant:** [Tenant Name]

## Premises
- **Address:** [Facility Address]
- **Square Footage:** [Size]
- **Permitted Use:** [Usage description]

## Lease Term
- **Commencement Date:** [Start Date]
- **Expiration Date:** [End Date]
- **Renewal Options:** [Renewal terms]

## Rent and Additional Charges
- **Monthly Rent:** [Amount]
- **Security Deposit:** [Amount]
- **Utilities:** [Responsibility]

## Maintenance and Repairs
[Specify maintenance responsibilities]

## Signatures
Landlord: ___________________________ Date: __________

Tenant: ___________________________ Date: __________`
      },
      'vendor-partnership': {
        title: 'Vendor Partnership Agreement',
        content: `# Vendor Partnership Agreement

## Parties
- **Vendor:** [Vendor Name]
- **Partner:** [Partner Name]

## Partnership Scope
[Define the scope and objectives of the partnership]

## Responsibilities
- **Vendor Responsibilities:** [List]
- **Partner Responsibilities:** [List]

## Revenue Sharing
- **Commission Structure:** [Percentage/Amount]
- **Payment Schedule:** [Frequency]

## Term and Termination
- **Effective Date:** [Start Date]
- **Duration:** [Length]
- **Termination Rights:** [Conditions]

## Confidentiality
[Confidentiality and non-disclosure terms]

## Signatures
Vendor: ___________________________ Date: __________

Partner: ___________________________ Date: __________`
      }
    };

    const template = templates[templateType];
    const newContract = {
      id: Date.now().toString(),
      title: template.title,
      content: template.content,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: templateType
    };
    if (onContractCreate) {
      onContractCreate(newContract);
    }
  };

  const handleOpenContractFromMenu = () => {
    console.log('Opening contracts modal from menu...');
    setShowContractsMenu(false);
    setShowContractsModal(true);
  };

  const handleContractsMenuToggle = () => {
    setShowContractsMenu(!showContractsMenu);
    // Close workflow menu when opening contracts menu
    if (!showContractsMenu) {
      setShowWorkflowMenu(false);
    }
  };

  const handleWorkflowMenuToggle = () => {
    setShowWorkflowMenu(!showWorkflowMenu);
    // Close contracts menu when opening workflow menu
    if (!showWorkflowMenu) {
      setShowContractsMenu(false);
    }
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
          <div className="contracts-menu-container" ref={contractsMenuRef}>
            <button
              onClick={handleContractsMenuToggle}
              className="contracts-button"
            >
              Contracts
              <FaChevronDown size={12} style={{ marginLeft: '6px' }} />
            </button>
            {showContractsMenu && (
              <div className="contracts-dropdown">
                <button onClick={handleNewContractFromMenu} className="contracts-option">
                  New Contract
                </button>
                <button onClick={handleOpenContractFromMenu} className="contracts-option">
                  Open Contract ...
                </button>
                <button onClick={handleNewContractFromMenu} className="contracts-option">
                  Export Contract ...
                </button>
                <button onClick={handleNewContractFromMenu} className="contracts-option">
                  Manage Contracts ...
                </button>
              </div>
            )}
          </div>
          <button onClick={() => handleNav('administration')}>Administration</button>
          <button onClick={() => handleNav('settings')}>Settings</button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="workflow-menu-container" ref={workflowMenuRef}>
          <button
            onClick={handleWorkflowMenuToggle}
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
        onSelectContract={handleSelectContract}
      />

      {/* New Contract Modal */}
      {showNewContractModal && (
        <div className="modal-overlay" onClick={handleCloseNewContractModal}>
          <div className="modal-content new-contract-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Contract</h2>
              <button className="modal-close" onClick={handleCloseNewContractModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="contract-options">
                <button
                  className="contract-option blank-contract"
                  onClick={handleCreateBlankContract}
                >
                  <div className="option-icon">
                    <FaFileAlt />
                  </div>
                  <div className="option-content">
                    <h3>Blank Contract</h3>
                    <p>Start with a clean slate and build your contract from scratch</p>
                  </div>
                </button>

                <div className="templates-section">
                  <h3>Choose from Template</h3>
                  <div className="templates-grid">
                    <button
                      className="contract-option template-option"
                      onClick={() => handleCreateFromTemplate('service-agreement')}
                    >
                      <div className="option-icon">
                        <FaHandshake />
                      </div>
                      <div className="option-content">
                        <h4>Service Agreement</h4>
                        <p>Professional services, consulting, and maintenance contracts</p>
                      </div>
                    </button>

                    <button
                      className="contract-option template-option"
                      onClick={() => handleCreateFromTemplate('supply-contract')}
                    >
                      <div className="option-icon">
                        <FaTools />
                      </div>
                      <div className="option-content">
                        <h4>Supply Contract</h4>
                        <p>Equipment, materials, and goods procurement agreements</p>
                      </div>
                    </button>

                    <button
                      className="contract-option template-option"
                      onClick={() => handleCreateFromTemplate('facility-lease')}
                    >
                      <div className="option-icon">
                        <FaBuilding />
                      </div>
                      <div className="option-content">
                        <h4>Facility Lease</h4>
                        <p>Office space, warehouse, and property rental agreements</p>
                      </div>
                    </button>

                    <button
                      className="contract-option template-option"
                      onClick={() => handleCreateFromTemplate('vendor-partnership')}
                    >
                      <div className="option-icon">
                        <FaFileContract />
                      </div>
                      <div className="option-content">
                        <h4>Vendor Partnership</h4>
                        <p>Strategic partnerships and long-term supplier relationships</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
