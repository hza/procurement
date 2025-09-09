import React, { useState } from 'react';
import { FaTimes, FaFileContract, FaFileAlt, FaLaptop, FaHardHat, FaUserTie, FaCogs } from 'react-icons/fa';

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
      'it-procurement': {
        title: 'IT Procurement Contract',
        content: `# IT Procurement Contract

## Procurement Parties
- **Procuring Entity:** [Organization Name]
- **Vendor/Supplier:** [Vendor Name]
- **Contract Reference:** [Contract Number]

## Scope of Procurement
### IT Services/Products Required:
- Hardware procurement and installation
- Software licensing and deployment
- System integration and testing
- Training and knowledge transfer
- Maintenance and support services

## Technical Specifications
### Minimum Requirements:
- System compatibility and interoperability
- Performance benchmarks and SLAs
- Security and compliance standards
- Scalability and future-proofing requirements

## Procurement Terms
- **Contract Period:** [Start Date] to [End Date]
- **Total Contract Value:** [Amount]
- **Payment Schedule:** [Milestone-based payments]
- **Delivery Timeline:** [Key milestones and deadlines]

## Vendor Qualifications
- **Experience:** [Years in relevant field]
- **Certifications:** [Required industry certifications]
- **Financial Stability:** [Proof of financial capability]
- **References:** [Previous similar projects]

## Risk Management
- **Performance Bonds:** [Amount/Percentage]
- **Insurance Requirements:** [Types and coverage]
- **Penalty Clauses:** [For delays/non-performance]
- **Force Majeure:** [Exemption conditions]

## Compliance and Legal
- **Data Protection:** [GDPR/CCPA compliance requirements]
- **Intellectual Property:** [Ownership and licensing terms]
- **Confidentiality:** [NDA requirements]
- **Dispute Resolution:** [Arbitration/jurisdiction]

## Signatures
Procuring Entity: ___________________________ Date: __________

Vendor/Supplier: ___________________________ Date: __________`
      },
      'construction-procurement': {
        title: 'Construction Procurement Contract',
        content: `# Construction Procurement Contract

## Procurement Parties
- **Procuring Authority:** [Government/Organization Name]
- **Contractor:** [Construction Company Name]
- **Project Reference:** [Project ID/Number]

## Project Scope
### Construction Works Required:
- Site preparation and earthworks
- Building construction (foundation, structure, finishes)
- Infrastructure development (roads, utilities, landscaping)
- Quality control and testing
- Project management and supervision

## Technical Specifications
### Construction Standards:
- Building codes and regulations compliance
- Material specifications and quality standards
- Safety and environmental requirements
- Energy efficiency and sustainability standards

## Procurement Terms
- **Contract Period:** [Start Date] to [End Date]
- **Total Contract Value:** [Amount including contingencies]
- **Payment Schedule:** [Progress-based payments]
- **Project Timeline:** [Critical path milestones]

## Contractor Qualifications
- **Licensing:** [Required construction licenses]
- **Experience:** [Similar project experience]
- **Financial Capacity:** [Bank guarantees, bonding capacity]
- **Technical Expertise:** [Qualified personnel and equipment]

## Risk Management
- **Performance Security:** [Bank guarantee amount]
- **Insurance Coverage:** [Construction all-risk, liability]
- **Liquidated Damages:** [Daily/weekly penalty rates]
- **Variation Orders:** [Change management procedures]

## Quality Assurance
- **Inspection Points:** [Quality checkpoints]
- **Testing Requirements:** [Material and workmanship tests]
- **Defect Liability Period:** [Warranty duration]
- **Maintenance Obligations:** [Post-construction support]

## Signatures
Procuring Authority: ___________________________ Date: __________

Contractor: ___________________________ Date: __________`
      },
      'professional-services': {
        title: 'Professional Services Procurement Contract',
        content: `# Professional Services Procurement Contract

## Procurement Parties
- **Client Organization:** [Organization Name]
- **Service Provider:** [Consulting Firm/Individual]
- **Engagement Reference:** [Project/Contract Number]

## Scope of Services
### Professional Services Required:
- Consulting and advisory services
- Project management and coordination
- Technical expertise and specialized knowledge
- Training and capacity building
- Documentation and reporting

## Service Deliverables
### Key Outputs:
- Comprehensive assessment and analysis reports
- Strategic recommendations and implementation plans
- Training materials and knowledge transfer
- Progress reports and final documentation
- Performance metrics and evaluation reports

## Procurement Terms
- **Contract Period:** [Start Date] to [End Date]
- **Total Contract Value:** [Amount including reimbursables]
- **Payment Terms:** [Time/materials or fixed-price]
- **Service Level Agreements:** [Response times, deliverables]

## Service Provider Qualifications
- **Professional Certifications:** [Relevant licenses/certifications]
- **Experience Requirements:** [Years of experience, similar projects]
- **Team Composition:** [Key personnel qualifications]
- **Methodology:** [Approach and work processes]

## Performance Management
- **KPIs and Metrics:** [Measurable performance indicators]
- **Reporting Requirements:** [Frequency and format]
- **Quality Assurance:** [Review and approval processes]
- **Change Management:** [Scope modification procedures]

## Legal and Compliance
- **Intellectual Property:** [Ownership of deliverables]
- **Confidentiality:** [Information protection requirements]
- **Data Security:** [Privacy and protection standards]
- **Termination Clauses:** [Early termination conditions]

## Signatures
Client Organization: ___________________________ Date: __________

Service Provider: ___________________________ Date: __________`
      },
      'equipment-procurement': {
        title: 'Equipment Procurement Contract',
        content: `# Equipment Procurement Contract

## Procurement Parties
- **Procuring Organization:** [Organization Name]
- **Equipment Supplier:** [Manufacturer/Distributor Name]
- **Purchase Order Reference:** [PO Number]

## Equipment Specifications
### Items to be Procured:
- Equipment make, model, and specifications
- Quantity and configuration requirements
- Accessories, spare parts, and consumables
- Installation and commissioning requirements
- Training and documentation needs

## Technical Requirements
### Performance Specifications:
- Operating parameters and capacity
- Efficiency and energy consumption ratings
- Safety and compliance standards
- Environmental impact considerations
- Maintenance and serviceability requirements

## Procurement Terms
- **Delivery Schedule:** [Required delivery dates]
- **Total Contract Value:** [Equipment + installation + training]
- **Payment Terms:** [Deposit, progress, final payments]
- **Warranty Period:** [Equipment warranty duration]

## Supplier Qualifications
- **Manufacturing Standards:** [ISO certifications, quality systems]
- **Technical Support:** [Local service capabilities]
- **Supply Chain:** [Reliability and backup suppliers]
- **Financial Stability:** [Company financial health]

## Delivery and Installation
- **Shipping and Logistics:** [Delivery terms, insurance, customs]
- **Installation Services:** [On-site installation and commissioning]
- **Training Requirements:** [Operator and maintenance training]
- **Documentation:** [User manuals, maintenance guides]

## Maintenance and Support
- **Warranty Terms:** [Coverage, response times, parts availability]
- **Service Contracts:** [Optional extended support agreements]
- **Spare Parts:** [Availability and pricing for 5+ years]
- **Technical Support:** [Help desk, remote assistance]

## Signatures
Procuring Organization: ___________________________ Date: __________

Equipment Supplier: ___________________________ Date: __________`
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
                  onClick={() => handleCreateFromTemplate('it-procurement')}
                >
                  <div className="option-icon">
                    <FaLaptop />
                  </div>
                  <div className="option-content">
                    <h4>IT Procurement</h4>
                    <p>Hardware, software, and IT services procurement contracts</p>
                  </div>
                </button>

                <button
                  className="contract-option template-option"
                  onClick={() => handleCreateFromTemplate('construction-procurement')}
                >
                  <div className="option-icon">
                    <FaHardHat />
                  </div>
                  <div className="option-content">
                    <h4>Construction Procurement</h4>
                    <p>Building, infrastructure, and construction project contracts</p>
                  </div>
                </button>

                <button
                  className="contract-option template-option"
                  onClick={() => handleCreateFromTemplate('professional-services')}
                >
                  <div className="option-icon">
                    <FaUserTie />
                  </div>
                  <div className="option-content">
                    <h4>Professional Services</h4>
                    <p>Consulting, advisory, and specialized service contracts</p>
                  </div>
                </button>

                <button
                  className="contract-option template-option"
                  onClick={() => handleCreateFromTemplate('equipment-procurement')}
                >
                  <div className="option-icon">
                    <FaCogs />
                  </div>
                  <div className="option-content">
                    <h4>Equipment Procurement</h4>
                    <p>Machinery, tools, and equipment purchase agreements</p>
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
