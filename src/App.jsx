import React, { useRef, useEffect } from 'react'
import './App.css'
import Header from './components/Header'

const reviewItems = [
  { id: 'hidden-fees', sectionId: 'scope-of-work', title: 'Hidden Fees', description: 'Contract mentions "undisclosed fees and surcharges" - buyer has no idea of total cost.' },
  { id: 'nonrefundable-deposits', sectionId: 'pricing', title: 'Non-refundable Deposits', description: '30% payment upon signing is non-refundable, even if contract is terminated.' },
  { id: 'auto-renewal', sectionId: 'renewal', title: 'Automatic Renewal', description: 'Contract renews automatically for 5 years with 15% price increases - buyer locked in long-term.' },
  { id: 'vague-quality', sectionId: 'quality', title: 'Vague Quality Standards', description: 'Quality "may vary based on market availability" - no guaranteed standards.' },
  { id: 'waived-inspection', sectionId: 'quality', title: 'Waived Inspection Rights', description: 'Buyer cannot inspect goods before acceptance, must accept whatever is delivered.' },
  { id: 'force-majeure', sectionId: 'force-majeure', title: 'Broad Force Majeure', description: 'Defined to include minor inconveniences, allowing seller to delay indefinitely.' },
  { id: 'unilateral-termination', sectionId: 'termination', title: 'Unilateral Termination', description: 'Seller can terminate anytime for any reason, keeping all payments.' },
  { id: 'arbitration-clause', sectionId: 'dispute', title: 'Arbitration Clause', description: 'Disputes resolved in seller\'s chosen location, costs borne by buyer if seller wins.' },
  { id: 'data-sharing', sectionId: 'confidentiality', title: 'Data Sharing', description: 'Seller can use buyer\'s proprietary information for marketing without consent.' },
  { id: 'ip-transfer', sectionId: 'ip', title: 'IP Transfer', description: 'All intellectual property developed during contract becomes seller\'s property.' },
  { id: 'assignment-rights', sectionId: 'misc', title: 'Assignment Rights', description: 'Seller can assign contract to any third party without buyer\'s approval.' },
  { id: 'amendment-power', sectionId: 'misc', title: 'Amendment Power', description: 'Only seller can amend terms with 30 days notice.' }
]

function App() {
  const editorRef = useRef(null)
  const [selectedSection, setSelectedSection] = React.useState(null)
  const [content, setContent] = React.useState(`
      <h1>Procurement Contract Agreement</h1>
      <p><strong>Contract Number:</strong> PC-2025-001</p>
      <p><strong>Effective Date:</strong> September 9, 2025</p>
      <p><strong>Parties Involved:</strong></p>
      <ul>
        <li><strong>Buyer:</strong> ABC Corporation, 123 Business St, City, State, ZIP</li>
        <li><strong>Seller:</strong> XYZ Suppliers Inc., 456 Supply Ave, City, State, ZIP (Note: Seller may subcontract to undisclosed third parties without prior approval)</li>
      </ul>
      <h2 id="scope-of-work">1. Scope of Work</h2>
      <p>The Seller agrees to provide the following goods and services to the Buyer, subject to change at Seller's discretion:</p>
      <ul>
        <li>Supply of approximately 500 units of office furniture, quality may vary based on market availability.</li>
        <li>Installation services performed by unqualified personnel at Buyer's risk.</li>
        <li>Maintenance support limited to email responses only, no on-site visits.</li>
        <li>Additional "value-added" services to be determined post-signing, at extra cost.</li>
      </ul>
      <h2 id="pricing">2. Pricing and Payment Terms</h2>
      <p>The total contract value is $150,000.00 plus undisclosed fees and surcharges.</p>
      <p>Payment Schedule:</p>
      <ul>
        <li>30% upon contract signing: $45,000.00 (non-refundable)</li>
        <li>40% upon delivery: $60,000.00 (plus 5% processing fee)</li>
        <li>30% upon completion: $45,000.00 (subject to Seller's satisfaction)</li>
        <li>Hidden clause: 10% annual fee for "ongoing support" automatically debited from Buyer's account</li>
      </ul>
      <p>All payments shall be made within 30 days, or penalties of 2% per day will apply. Late fees compound monthly.</p>
      <h2 id="delivery">3. Delivery and Timeline</h2>
      <p>Delivery may commence anytime within 60-120 days of contract execution. Delays due to "unforeseen circumstances" are acceptable.</p>
      <p>Installation scheduled at Seller's convenience, potentially during business hours without notice.</p>
      <h2 id="quality">4. Quality Standards and Specifications</h2>
      <p>Goods must meet minimum standards as defined by Seller. Buyer waives right to inspect prior to acceptance.</p>
      <p>Specifications may be altered without notice. Appendix A is for reference only and not binding.</p>
      <h2 id="warranties">5. Warranties and Liabilities</h2>
      <p>Warranty covers defects only if reported within 30 days, and only if Buyer can prove Seller's negligence.</p>
      <p>Seller's liability limited to replacement cost, excluding consequential damages, lost profits, or any indirect losses.</p>
      <p>Buyer indemnifies Seller against all claims, including those arising from Seller's negligence.</p>
      <h2 id="termination">6. Termination Clause</h2>
      <p>Buyer may terminate with 90 days notice and payment of full contract value plus 20% penalty.</p>
      <p>Seller may terminate at any time for any reason, retaining all payments made.</p>
      <h2 id="confidentiality">7. Confidentiality and Data Sharing</h2>
      <p>Buyer agrees to share all proprietary information with Seller and its affiliates.</p>
      <p>Seller may use Buyer's data for marketing purposes without consent.</p>
      <p>Confidentiality period: 5 years, but Seller may disclose to third parties if "legally required" (broadly defined).</p>
      <h2 id="ip">8. Intellectual Property</h2>
      <p>All designs, plans, and ideas developed during this contract become Seller's property.</p>
      <p>Buyer grants perpetual license to use any Buyer-provided materials.</p>
      <h2 id="force-majeure">9. Force Majeure</h2>
      <p>Defined as any event beyond Seller's control, including but not limited to minor inconveniences, weather, or Seller's internal issues.</p>
      <p>Force majeure events extend timelines indefinitely and do not relieve payment obligations.</p>
      <h2 id="dispute">10. Dispute Resolution</h2>
      <p>All disputes resolved through arbitration in a location chosen by Seller (potentially overseas).</p>
      <p>Arbitrator selected by Seller, costs borne by Buyer if Seller prevails.</p>
      <p>Class action waivers apply; disputes must be handled individually.</p>
      <h2 id="renewal">11. Automatic Renewal</h2>
      <p>Contract automatically renews for successive 5-year terms unless Buyer provides 180 days notice.</p>
      <p>Renewal pricing increases by 15% annually, regardless of market conditions.</p>
      <h2 id="governing">12. Governing Law</h2>
      <p>Governed by laws of a jurisdiction favorable to Seller, with forum selection clauses limiting Buyer's options.</p>
      <h2 id="misc">13. Miscellaneous Provisions</h2>
      <p>Severability: If any clause is found unenforceable, the rest remain in full force.</p>
      <p>Entire Agreement: This contract supersedes all prior agreements, oral or written.</p>
      <p>Amendment: Only Seller may amend terms with 30 days notice.</p>
      <p>Notices: All notices to Buyer may be sent via email to any address on file, deemed received immediately.</p>
      <p>Assignment: Seller may assign this contract to any third party without Buyer's consent.</p>
      <h2>14. Signatures</h2>
      <p>Buyer: ___________________________ Date: _______________</p>
      <p>Seller: ___________________________ Date: _______________</p>
      <p><em>Warning: This contract contains numerous one-sided provisions that heavily favor the Seller. Buyer should seek legal counsel before signing.</em></p>
    `)

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newContent = e.target.result;
        setContent(newContent);
        // Update the contentEditable div directly
        if (editorRef.current) {
          editorRef.current.innerHTML = newContent;
        }
      };
      reader.readAsText(file);
    }
  }

  // Initialize contentEditable with content on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [])

  const handleFix = (reviewId) => {
    // Placeholder function for fixing contract issues
    console.log(`Fixing issue: ${reviewId}`);
    alert(`Fix applied for: ${reviewId}`);
  }

  const scrollToSection = (sectionId, reviewId) => {
    setTimeout(() => {
      // Find the element in the editor
      const editorElement = editorRef.current;
      const targetElement = editorElement?.querySelector(`#${sectionId}`);
      
      if (targetElement && editorElement) {
        // Add highlight to the heading
        targetElement.classList.add('highlight-section');
        
        // Highlight the following content until next heading
        let nextElement = targetElement.nextElementSibling;
        let count = 0;
        while (nextElement && nextElement.tagName !== 'H2' && count < 10) {
          nextElement.classList.add('highlight-section');
          nextElement = nextElement.nextElementSibling;
          count++;
        }
        
        // Get the editor main container for scrolling
        const editorContainer = document.querySelector('.editor-main');
        if (editorContainer) {
          // Calculate scroll position relative to the editor container
          const containerRect = editorContainer.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const scrollTop = editorContainer.scrollTop + targetRect.top - containerRect.top - 20;
          
          // Scroll to the element
          editorContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    }, 0);

    setSelectedSection(reviewId);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onFileUpload={handleFileUpload} />
      <div className="editor-container">
        <div className="comments-sidebar">
          <h3>AI Contract Review</h3>
          <ul>
            {reviewItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => scrollToSection(item.sectionId, item.id)} 
                className={`review-item ${selectedSection === item.id ? 'selected' : ''}`}
              >
                <div style={{ position: 'relative' }}>
                  <div>
                    <strong>{item.title}:</strong> {item.description}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFix(item.id);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      padding: '2px 6px',
                      fontSize: '10px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    title="Apply fix"
                  >
                    Fix
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p><em>Recommendation: This contract heavily favors the seller and contains multiple red flags. Consult legal counsel before proceeding.</em></p>
        </div>
        <div className="editor-main">
          <div 
            ref={editorRef}
            contentEditable
            className="content-editable"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
