import React, { useState } from 'react';
import { FaTimes, FaFileContract, FaFileAlt, FaHandshake, FaBuilding, FaTools } from 'react-icons/fa';

const NewContract = ({ isOpen, onClose, onContractCreate }) => {
  const [showModal, setShowModal] = useState(isOpen);

  // Update internal state when prop changes
  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleCreateBlankContract = () => {
    handleClose();
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
    handleClose();
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

  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content new-contract-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Contract</h2>
          <button className="modal-close" onClick={handleClose}>
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
  );
};

export default NewContract;
