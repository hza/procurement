import React, { useRef, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import AIChat from './components/AIChat'
import Editor from './components/Editor'
import { defaultContractContent } from './data/defaultContract'

function App() {
  const chatInputRef = useRef(null)
  const chatResetRef = useRef(null)
  const [selectedSection, setSelectedSection] = React.useState(null)
  const [showRecommendation, setShowRecommendation] = React.useState(true)
  const [recommendationFading, setRecommendationFading] = React.useState(false)
  const [analyzerType, setAnalyzerType] = React.useState('contract')
  const [reviewItems, setReviewItems] = React.useState([
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
  ])

  const [negotiationItems, setNegotiationItems] = React.useState([
    { id: 'cost-reduction', sectionId: 'pricing', title: 'Cost Reduction Opportunity', description: 'Negotiate 15-20% reduction in base price by leveraging competitive bids and volume commitments.' },
    { id: 'payment-terms', sectionId: 'pricing', title: 'Payment Terms Improvement', description: 'Extend payment terms from 30 days to 60-90 days to improve cash flow and reduce financing costs.' },
    { id: 'volume-discounts', sectionId: 'pricing', title: 'Volume Discount Negotiation', description: 'Secure 5-10% additional discount by committing to 20% higher volume over 3-year period.' },
    { id: 'service-levels', sectionId: 'quality', title: 'Service Level Enhancement', description: 'Negotiate guaranteed 99.5% uptime SLA with financial penalties for non-compliance.' },
    { id: 'warranty-extension', sectionId: 'warranties', title: 'Extended Warranty Terms', description: 'Extend warranty period from 30 days to 12 months and include on-site support.' },
    { id: 'termination-rights', sectionId: 'termination', title: 'Termination Rights', description: 'Negotiate mutual termination rights with 60-day notice period and fair compensation terms.' },
    { id: 'performance-bonuses', sectionId: 'pricing', title: 'Performance-Based Incentives', description: 'Add performance bonuses for early delivery and quality excellence (up to 5% of contract value).' },
    { id: 'training-support', sectionId: 'scope-of-work', title: 'Training & Support Inclusion', description: 'Negotiate complimentary training sessions and ongoing technical support at no additional cost.' },
    { id: 'flexibility-clause', sectionId: 'misc', title: 'Contract Flexibility', description: 'Add clauses allowing scope adjustments within 15% without price changes.' },
    { id: 'benchmarking-rights', sectionId: 'misc', title: 'Benchmarking Rights', description: 'Secure right to benchmark pricing against market rates annually with adjustment rights.' }
  ])
  const currentReviewItems = analyzerType === 'negotiation' ? negotiationItems : reviewItems;
  
  const [content, setContent] = React.useState(defaultContractContent)

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newContent = e.target.result;
        setContent(newContent);
        // Update the contentEditable div directly
        if (window.editorRef && window.editorRef.current) {
          window.editorRef.current.innerHTML = newContent;
        }
        // Reset AI review state for uploaded contract
        setSelectedSection(null);
        setShowRecommendation(false);
        setReviewItems([]);
        // Reset AI assistant chat
        if (chatResetRef.current) {
          chatResetRef.current();
        }
        // Scroll to top of editor
        const editorContainer = document.querySelector('.editor-main');
        if (editorContainer) {
          editorContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        // Focus the editor for immediate typing
        if (window.editorRef && window.editorRef.current) {
          window.editorRef.current.focus();
          // Place cursor at the beginning of the content
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(window.editorRef.current);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      };
      reader.readAsText(file);
    }
  }

  const handleContractCreate = (newContract) => {
    // Update the content with the new contract
    setContent(newContract.content);
    // Update the contentEditable div directly
    if (window.editorRef && window.editorRef.current) {
      window.editorRef.current.innerHTML = newContract.content;
    }
    // Reset AI review state for new contract
    setSelectedSection(null);
    setShowRecommendation(false);
    setReviewItems([]);
    // Reset AI assistant chat
    if (chatResetRef.current) {
      chatResetRef.current();
    }
    // Scroll to top of editor
    const editorContainer = document.querySelector('.editor-main');
    if (editorContainer) {
      editorContainer.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
    // Focus the editor for immediate typing
    if (window.editorRef && window.editorRef.current) {
      window.editorRef.current.focus();
      // Place cursor at the beginning of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(window.editorRef.current);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    console.log('Created new contract:', newContract);
  }

  const handleFix = (reviewId) => {
    // Find the review item and set it in the chat input
    const reviewItem = currentReviewItems.find(item => item.id === reviewId);
    if (reviewItem && chatInputRef.current) {
      const fixText = analyzerType === 'negotiation' 
        ? `Negotiate this: ${reviewItem.title} - ${reviewItem.description}`
        : `Fix this issue: ${reviewItem.title} - ${reviewItem.description}`;
      chatInputRef.current(fixText);
    }
  }

  const handleCloseRecommendation = () => {
    setRecommendationFading(true);
    // Hide completely after fade animation
    setTimeout(() => {
      setShowRecommendation(false);
      setRecommendationFading(false);
    }, 1000);
  }

  const scrollToSection = (sectionId, reviewId) => {
    setTimeout(() => {
      // Find the element in the editor
      const editorElement = window.editorRef?.current;
      const targetElement = editorElement?.querySelector(`#${sectionId}`);
      // Remove previous highlights
      if (editorElement) {
        editorElement.querySelectorAll('.highlight-section').forEach(el => {
          el.classList.remove('highlight-section');
        });
      }
      
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
          // Account for sticky toolbar height so heading isn't hidden
          const toolbar = editorContainer.querySelector('.editor-toolbar');
          const toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;
          const extraPadding = 12; // small visual breathing space
          const scrollTop = editorContainer.scrollTop + targetRect.top - containerRect.top - toolbarHeight - extraPadding;
          
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

  const handleRefreshReview = () => {
    // For now, just reset the selected section and show a brief loading state
    setSelectedSection(null);
    // In a real implementation, this would trigger a new AI analysis
    console.log('Refreshing AI review...');
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        onFileUpload={handleFileUpload} 
        onContractCreate={handleContractCreate}
        showRecommendation={showRecommendation}
        recommendationFading={recommendationFading}
        onCloseRecommendation={handleCloseRecommendation}
      />
      <div className="editor-container">
        <div className="comments-sidebar">
          <div className="ai-review-header">
            <div className="analyzer-selector">
              <select 
                value={analyzerType} 
                onChange={(e) => setAnalyzerType(e.target.value)}
                className="analyzer-select"
              >
                <option value="contract">Contract Analyzer</option>
                <option value="negotiation">Negotiation Assistant</option>
              </select>
            </div>
            <button 
              onClick={handleRefreshReview}
              className="refresh-button"
              title="Refresh AI analysis"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
          </div>
          <ul>
            {currentReviewItems.length === 0 ? (
              <li className="no-problems" style={{ 
                textAlign: 'center', 
                padding: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '100%'
              }}>
                <em>No recommendations available</em>
              </li>
            ) : (
              currentReviewItems.map((item) => (
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
                        padding: '1px 4px',
                        fontSize: '9px',
                        backgroundColor: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        zIndex: 10,
                        height: '18px',
                        lineHeight: '16px'
                      }}
                      title={analyzerType === 'negotiation' ? "Get AI assistance to negotiate this" : "Get AI assistance to fix this issue"}
                    >
                      {analyzerType === 'negotiation' ? 'Negotiate' : 'Fix'}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <Editor 
          content={content}
          setContent={setContent}
          currentReviewItems={currentReviewItems}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          chatInputRef={chatInputRef}
          analyzerType={analyzerType}
        />
        <AIChat 
          setInputText={(fn) => { chatInputRef.current = fn; }} 
          setResetChat={(fn) => { chatResetRef.current = fn; }}
          analyzerType={analyzerType}
        />
      </div>
    </div>
  )
}

export default App
