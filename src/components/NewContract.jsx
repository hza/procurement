import React, { useState } from 'react';
import { FaTimes, FaFileContract, FaFileAlt, FaLaptop, FaHardHat, FaUserTie, FaCogs, FaBrain } from 'react-icons/fa';

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

  const handleGenerateWithAI = () => {
    handleClose();
    // Create a contract with AI-generated content placeholder
    const newContract = {
      id: Date.now().toString(),
      title: 'AI-Generated Contract',
      content: `<h1>AI-Generated Contract</h1>
<h2>Contract Parties</h2>
<ul>
<li><strong>Party A:</strong> <span class="placeholder">[Organization Name]</span></li>
<li><strong>Party B:</strong> <span class="placeholder">[Vendor/Supplier Name]</span></li>
<li><strong>Effective Date:</strong> <span class="placeholder">[Date]</span></li>
</ul>

<h2>Scope of Work</h2>
<p><span class="placeholder">[Describe the goods, services, or work to be provided]</span></p>

<h2>Terms and Conditions</h2>
<ul>
<li><strong>Payment Terms:</strong> <span class="placeholder">[Payment schedule and conditions]</span></li>
<li><strong>Delivery Timeline:</strong> <span class="placeholder">[Delivery or completion dates]</span></li>
<li><strong>Quality Standards:</strong> <span class="placeholder">[Quality requirements and specifications]</span></li>
</ul>

<h2>Signatures</h2>
<p><strong>Party A:</strong> ___________________________ <strong>Date:</strong> __________</p>
<p><strong>Party B:</strong> ___________________________ <strong>Date:</strong> __________</p>`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'ai-generated'
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
        content: `<h1>IT Procurement Contract</h1>

<h2>Procurement Parties</h2>
<ul>
<li><strong>Procuring Entity:</strong> <span class="placeholder">[Organization Name]</span></li>
<li><strong>Vendor/Supplier:</strong> <span class="placeholder">[Vendor Name]</span></li>
<li><strong>Contract Reference:</strong> <span class="placeholder">[Contract Number]</span></li>
</ul>

<h2>Scope of Procurement</h2>
<h3>IT Services/Products Required:</h3>
<ul>
<li>Hardware procurement and installation</li>
<li>Software licensing and deployment</li>
<li>System integration and testing</li>
<li>Training and knowledge transfer</li>
<li>Maintenance and support services</li>
</ul>

<h2>Technical Specifications</h2>
<h3>Minimum Requirements:</h3>
<ul>
<li>System compatibility and interoperability</li>
<li>Performance benchmarks and SLAs</li>
<li>Security and compliance standards</li>
<li>Scalability and future-proofing requirements</li>
</ul>

<h2>Procurement Terms</h2>
<ul>
<li><strong>Contract Period:</strong> <span class="placeholder">[Start Date]</span> to <span class="placeholder">[End Date]</span></li>
<li><strong>Total Contract Value:</strong> <span class="placeholder">[Amount]</span></li>
<li><strong>Payment Schedule:</strong> <span class="placeholder">[Milestone-based payments]</span></li>
<li><strong>Delivery Timeline:</strong> <span class="placeholder">[Key milestones and deadlines]</span></li>
</ul>

<h2>Vendor Qualifications</h2>
<ul>
<li><strong>Experience:</strong> <span class="placeholder">[Years in relevant field]</span></li>
<li><strong>Certifications:</strong> <span class="placeholder">[Required industry certifications]</span></li>
<li><strong>Financial Stability:</strong> <span class="placeholder">[Proof of financial capability]</span></li>
<li><strong>References:</strong> <span class="placeholder">[Previous similar projects]</span></li>
</ul>

<h2>Risk Management</h2>
<ul>
<li><strong>Performance Bonds:</strong> <span class="placeholder">[Amount/Percentage]</span></li>
<li><strong>Insurance Requirements:</strong> <span class="placeholder">[Types and coverage]</span></li>
<li><strong>Penalty Clauses:</strong> <span class="placeholder">[For delays/non-performance]</span></li>
<li><strong>Force Majeure:</strong> <span class="placeholder">[Exemption conditions]</span></li>
</ul>

<h2>Compliance and Legal</h2>
<ul>
<li><strong>Data Protection:</strong> <span class="placeholder">[GDPR/CCPA compliance requirements]</span></li>
<li><strong>Intellectual Property:</strong> <span class="placeholder">[Ownership and licensing terms]</span></li>
<li><strong>Confidentiality:</strong> <span class="placeholder">[NDA requirements]</span></li>
<li><strong>Dispute Resolution:</strong> <span class="placeholder">[Arbitration/jurisdiction]</span></li>
</ul>

<h2>Signatures</h2>
<p><strong>Procuring Entity:</strong> ___________________________ <strong>Date:</strong> __________</p>
<p><strong>Vendor/Supplier:</strong> ___________________________ <strong>Date:</strong> __________</p>`
      },
      'construction-procurement': {
        title: 'Construction Procurement Contract',
        content: `<h1>Construction Procurement Contract</h1>

<h2>Procurement Parties</h2>
<ul>
<li><strong>Procuring Authority:</strong> <span class="placeholder">[Government/Organization Name]</span></li>
<li><strong>Contractor:</strong> <span class="placeholder">[Construction Company Name]</span></li>
<li><strong>Project Reference:</strong> <span class="placeholder">[Project ID/Number]</span></li>
</ul>

<h2>Project Scope</h2>
<h3>Construction Works Required:</h3>
<ul>
<li>Site preparation and earthworks</li>
<li>Building construction (foundation, structure, finishes)</li>
<li>Infrastructure development (roads, utilities, landscaping)</li>
<li>Quality control and testing</li>
<li>Project management and supervision</li>
</ul>

<h2>Technical Specifications</h2>
<h3>Construction Standards:</h3>
<ul>
<li>Building codes and regulations compliance</li>
<li>Material specifications and quality standards</li>
<li>Safety and environmental requirements</li>
<li>Energy efficiency and sustainability standards</li>
</ul>

<h2>Procurement Terms</h2>
<ul>
<li><strong>Contract Period:</strong> <span class="placeholder">[Start Date]</span> to <span class="placeholder">[End Date]</span></li>
<li><strong>Total Contract Value:</strong> <span class="placeholder">[Amount including contingencies]</span></li>
<li><strong>Payment Schedule:</strong> <span class="placeholder">[Progress-based payments]</span></li>
<li><strong>Project Timeline:</strong> <span class="placeholder">[Critical path milestones]</span></li>
</ul>

<h2>Contractor Qualifications</h2>
<ul>
<li><strong>Licensing:</strong> <span class="placeholder">[Required construction licenses]</span></li>
<li><strong>Experience:</strong> <span class="placeholder">[Similar project experience]</span></li>
<li><strong>Financial Capacity:</strong> <span class="placeholder">[Bank guarantees, bonding capacity]</span></li>
<li><strong>Technical Expertise:</strong> <span class="placeholder">[Qualified personnel and equipment]</span></li>
</ul>

<h2>Risk Management</h2>
<ul>
<li><strong>Performance Security:</strong> <span class="placeholder">[Bank guarantee amount]</span></li>
<li><strong>Insurance Coverage:</strong> <span class="placeholder">[Construction all-risk, liability]</span></li>
<li><strong>Liquidated Damages:</strong> <span class="placeholder">[Daily/weekly penalty rates]</span></li>
<li><strong>Variation Orders:</strong> <span class="placeholder">[Change management procedures]</span></li>
</ul>

<h2>Quality Assurance</h2>
<ul>
<li><strong>Inspection Points:</strong> <span class="placeholder">[Quality checkpoints]</span></li>
<li><strong>Testing Requirements:</strong> <span class="placeholder">[Material and workmanship tests]</span></li>
<li><strong>Defect Liability Period:</strong> <span class="placeholder">[Warranty duration]</span></li>
<li><strong>Maintenance Obligations:</strong> <span class="placeholder">[Post-construction support]</span></li>
</ul>

<h2>Signatures</h2>
<p><strong>Procuring Authority:</strong> ___________________________ <strong>Date:</strong> __________</p>
<p><strong>Contractor:</strong> ___________________________ <strong>Date:</strong> __________</p>`
      },
      'professional-services': {
        title: 'Professional Services Procurement Contract',
        content: `<h1>Professional Services Procurement Contract</h1>

<h2>Procurement Parties</h2>
<ul>
<li><strong>Client Organization:</strong> <span class="placeholder">[Organization Name]</span></li>
<li><strong>Service Provider:</strong> <span class="placeholder">[Consulting Firm/Individual]</span></li>
<li><strong>Engagement Reference:</strong> <span class="placeholder">[Project/Contract Number]</span></li>
</ul>

<h2>Scope of Services</h2>
<h3>Professional Services Required:</h3>
<ul>
<li>Consulting and advisory services</li>
<li>Project management and coordination</li>
<li>Technical expertise and specialized knowledge</li>
<li>Training and capacity building</li>
<li>Documentation and reporting</li>
</ul>

<h2>Service Deliverables</h2>
<h3>Key Outputs:</h3>
<ul>
<li>Comprehensive assessment and analysis reports</li>
<li>Strategic recommendations and implementation plans</li>
<li>Training materials and knowledge transfer</li>
<li>Progress reports and final documentation</li>
<li>Performance metrics and evaluation reports</li>
</ul>

<h2>Procurement Terms</h2>
<ul>
<li><strong>Contract Period:</strong> <span class="placeholder">[Start Date]</span> to <span class="placeholder">[End Date]</span></li>
<li><strong>Total Contract Value:</strong> <span class="placeholder">[Amount including reimbursables]</span></li>
<li><strong>Payment Terms:</strong> <span class="placeholder">[Time/materials or fixed-price]</span></li>
<li><strong>Service Level Agreements:</strong> <span class="placeholder">[Response times, deliverables]</span></li>
</ul>

<h2>Service Provider Qualifications</h2>
<ul>
<li><strong>Professional Certifications:</strong> <span class="placeholder">[Relevant licenses/certifications]</span></li>
<li><strong>Experience Requirements:</strong> <span class="placeholder">[Years of experience, similar projects]</span></li>
<li><strong>Team Composition:</strong> <span class="placeholder">[Key personnel qualifications]</span></li>
<li><strong>Methodology:</strong> <span class="placeholder">[Approach and work processes]</span></li>
</ul>

<h2>Performance Management</h2>
<ul>
<li><strong>KPIs and Metrics:</strong> <span class="placeholder">[Measurable performance indicators]</span></li>
<li><strong>Reporting Requirements:</strong> <span class="placeholder">[Frequency and format]</span></li>
<li><strong>Quality Assurance:</strong> <span class="placeholder">[Review and approval processes]</span></li>
<li><strong>Change Management:</strong> <span class="placeholder">[Scope modification procedures]</span></li>
</ul>

<h2>Legal and Compliance</h2>
<ul>
<li><strong>Intellectual Property:</strong> <span class="placeholder">[Ownership of deliverables]</span></li>
<li><strong>Confidentiality:</strong> <span class="placeholder">[Information protection requirements]</span></li>
<li><strong>Data Security:</strong> <span class="placeholder">[Privacy and protection standards]</span></li>
<li><strong>Termination Clauses:</strong> <span class="placeholder">[Early termination conditions]</span></li>
</ul>

<h2>Signatures</h2>
<p><strong>Client Organization:</strong> ___________________________ <strong>Date:</strong> __________</p>
<p><strong>Service Provider:</strong> ___________________________ <strong>Date:</strong> __________</p>`
      },
      'equipment-procurement': {
        title: 'Equipment Procurement Contract',
        content: `<h1>Equipment Procurement Contract</h1>

<h2>Procurement Parties</h2>
<ul>
<li><strong>Procuring Organization:</strong> <span class="placeholder">[Organization Name]</span></li>
<li><strong>Equipment Supplier:</strong> <span class="placeholder">[Manufacturer/Distributor Name]</span></li>
<li><strong>Purchase Order Reference:</strong> <span class="placeholder">[PO Number]</span></li>
</ul>

<h2>Equipment Specifications</h2>
<h3>Items to be Procured:</h3>
<ul>
<li>Equipment make, model, and specifications</li>
<li>Quantity and configuration requirements</li>
<li>Accessories, spare parts, and consumables</li>
<li>Installation and commissioning requirements</li>
<li>Training and documentation needs</li>
</ul>

<h2>Technical Requirements</h2>
<h3>Performance Specifications:</h3>
<ul>
<li>Operating parameters and capacity</li>
<li>Efficiency and energy consumption ratings</li>
<li>Safety and compliance standards</li>
<li>Environmental impact considerations</li>
<li>Maintenance and serviceability requirements</li>
</ul>

<h2>Procurement Terms</h2>
<ul>
<li><strong>Delivery Schedule:</strong> <span class="placeholder">[Required delivery dates]</span></li>
<li><strong>Total Contract Value:</strong> <span class="placeholder">[Equipment + installation + training]</span></li>
<li><strong>Payment Terms:</strong> <span class="placeholder">[Deposit, progress, final payments]</span></li>
<li><strong>Warranty Period:</strong> <span class="placeholder">[Equipment warranty duration]</span></li>
</ul>

<h2>Supplier Qualifications</h2>
<ul>
<li><strong>Manufacturing Standards:</strong> <span class="placeholder">[ISO certifications, quality systems]</span></li>
<li><strong>Technical Support:</strong> <span class="placeholder">[Local service capabilities]</span></li>
<li><strong>Supply Chain:</strong> <span class="placeholder">[Reliability and backup suppliers]</span></li>
<li><strong>Financial Stability:</strong> <span class="placeholder">[Company financial health]</span></li>
</ul>

<h2>Delivery and Installation</h2>
<ul>
<li><strong>Shipping and Logistics:</strong> <span class="placeholder">[Delivery terms, insurance, customs]</span></li>
<li><strong>Installation Services:</strong> <span class="placeholder">[On-site installation and commissioning]</span></li>
<li><strong>Training Requirements:</strong> <span class="placeholder">[Operator and maintenance training]</span></li>
<li><strong>Documentation:</strong> <span class="placeholder">[User manuals, maintenance guides]</span></li>
</ul>

<h2>Maintenance and Support</h2>
<ul>
<li><strong>Warranty Terms:</strong> <span class="placeholder">[Coverage, response times, parts availability]</span></li>
<li><strong>Service Contracts:</strong> <span class="placeholder">[Optional extended support agreements]</span></li>
<li><strong>Spare Parts:</strong> <span class="placeholder">[Availability and pricing for 5+ years]</span></li>
<li><strong>Technical Support:</strong> <span class="placeholder">[Help desk, remote assistance]</span></li>
</ul>

<h2>Signatures</h2>
<p><strong>Procuring Organization:</strong> ___________________________ <strong>Date:</strong> __________</p>
<p><strong>Equipment Supplier:</strong> ___________________________ <strong>Date:</strong> __________</p>`
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

            <button
              className="contract-option ai-generate"
              onClick={handleGenerateWithAI}
            >
              <div className="option-icon">
                <FaBrain />
              </div>
              <div className="option-content">
                <h3>Generate Using AI</h3>
                <p>Let AI create a customized contract based on your requirements</p>
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
