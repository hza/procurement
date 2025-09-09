import React, { useRef, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import AIChat from './components/AIChat'

function App() {
  const editorRef = useRef(null)
  const chatInputRef = useRef(null)
  const chatResetRef = useRef(null)
  const [selectedSection, setSelectedSection] = React.useState(null)
  const [showRecommendation, setShowRecommendation] = React.useState(true)
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
  // Formatting state
  const [boldActive, setBoldActive] = React.useState(false)
  const [italicActive, setItalicActive] = React.useState(false)
  const [underlineActive, setUnderlineActive] = React.useState(false)
  const [ulActive, setUlActive] = React.useState(false)
  const [olActive, setOlActive] = React.useState(false)
  const [blockType, setBlockType] = React.useState('P')
  const [strikeActive, setStrikeActive] = React.useState(false)
  const [blockquoteActive, setBlockquoteActive] = React.useState(false)
  const [codeActive, setCodeActive] = React.useState(false)
  const [linkActive, setLinkActive] = React.useState(false)
  const [align, setAlign] = React.useState('left')
  const [content, setContent] = React.useState(`
      <h1>Procurement Contract Agreement</h1>
      <p><strong>Contract Number:</strong> PC-2025-001</p>
      <p><strong>Effective Date:</strong> September 9, 2025</p>
      <p><strong>Parties Involved:</strong></p>
      <ul>
        <li><strong>Buyer:</strong> ABC Corporation, 123 Business St, City, State, ZIP</li>
        <li><strong>Seller:</strong> CCP Suppliers Inc., 456 Supply Ave, City, State, ZIP (Note: Seller may subcontract to undisclosed third parties without prior approval)</li>
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
      };
      reader.readAsText(file);
    }
  }

  const handleContractCreate = (newContract) => {
    // Update the content with the new contract
    setContent(newContract.content);
    // Update the contentEditable div directly
    if (editorRef.current) {
      editorRef.current.innerHTML = newContract.content;
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
        behavior: 'smooth'
      });
    }
    console.log('Created new contract:', newContract);
  }

  // Initialize contentEditable with content on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [])

  // When content state changes externally (e.g. file upload), update editor only if different
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== content) {
      // Try to preserve scroll position
      const selection = document.getSelection();
      const isFocused = document.activeElement === editorRef.current;
      editorRef.current.innerHTML = content;
      if (isFocused && selection) {
        // Place caret at end after external change
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [content]);

  const handleFix = (reviewId) => {
    // Find the review item and set it in the chat input
    const reviewItem = reviewItems.find(item => item.id === reviewId);
    if (reviewItem && chatInputRef.current) {
      const fixText = `Fix this issue: ${reviewItem.title} - ${reviewItem.description}`;
      chatInputRef.current(fixText);
    }
  }

  const handleCloseRecommendation = () => {
    setShowRecommendation(false);
  }

  const handleRefreshReview = () => {
    // For now, just reset the selected section and show a brief loading state
    setSelectedSection(null);
    // In a real implementation, this would trigger a new AI analysis
    console.log('Refreshing AI review...');
  }

  // Formatting helpers for the content editor
  const applyFormat = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      // Defer update to allow command to apply
      setTimeout(updateFormattingState, 0);
    }
  }

  const handleBlockChange = (e) => {
    const val = e.target.value;
    applyFormat('formatBlock', val);
    setBlockType(val);
  }

  const updateFormattingState = () => {
    if (!editorRef.current) return;
    try {
      setBoldActive(document.queryCommandState('bold'));
      setItalicActive(document.queryCommandState('italic'));
      setUnderlineActive(document.queryCommandState('underline'));
      setUlActive(document.queryCommandState('insertUnorderedList'));
      setOlActive(document.queryCommandState('insertOrderedList'));
      setStrikeActive(document.queryCommandState('strikeThrough'));
      // Alignment
      const center = document.queryCommandState('justifyCenter');
      const right = document.queryCommandState('justifyRight');
      const full = document.queryCommandState('justifyFull');
      if (center) setAlign('center'); else if (right) setAlign('right'); else if (full) setAlign('justify'); else setAlign('left');
      let block = document.queryCommandValue('formatBlock');
      if (block) {
        block = block.replace(/<|>/g, '').toUpperCase();
        if (['P','H1','H2','H3'].includes(block)) {
          setBlockType(block);
        }
      }
      // Blockquote detection
      const sel = document.getSelection();
      if (sel && sel.anchorNode) {
        let node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentNode : sel.anchorNode;
        let foundBQ = false; let foundCode = false; let foundLink = false;
        while (node && node !== editorRef.current) {
          const tag = node.tagName;
            if (tag === 'BLOCKQUOTE') foundBQ = true;
            if (tag === 'CODE') foundCode = true;
            if (tag === 'A') foundLink = true;
          node = node.parentNode;
        }
        setBlockquoteActive(foundBQ);
        setCodeActive(foundCode);
        setLinkActive(foundLink);
      } else {
        setBlockquoteActive(false); setCodeActive(false); setLinkActive(false);
      }
    } catch (e) {
      // Silently ignore unsupported queryCommand in some browsers
    }
  }

  // Listen to selection changes to update button states
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = document.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const anchorNode = sel.anchorNode;
      if (!anchorNode) return;
      // Ensure selection is within editor
      if (editorRef.current && editorRef.current.contains(anchorNode)) {
        updateFormattingState();
      }
    }
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const toggleBlockquote = () => {
    if (!editorRef.current) return;
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    // If already in blockquote, unwrap
    if (blockquoteActive) {
      document.execCommand('formatBlock', false, 'P');
    } else {
      document.execCommand('formatBlock', false, 'BLOCKQUOTE');
    }
    setTimeout(updateFormattingState, 0);
  }

  const toggleInlineCode = () => {
    if (!editorRef.current) return;
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (codeActive) {
      // unwrap code
      let node = sel.anchorNode;
      if (node && node.nodeType === 3) node = node.parentNode;
      while (node && node !== editorRef.current && node.tagName !== 'CODE') node = node.parentNode;
      if (node && node.tagName === 'CODE') {
        const parent = node.parentNode;
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      }
    } else {
      const span = document.createElement('code');
      span.appendChild(range.extractContents());
      range.insertNode(span);
      // Move caret after code
      range.setStartAfter(span);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    setTimeout(updateFormattingState, 0);
  }

  const handleCreateLink = () => {
    let url = prompt('Enter URL');
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    document.execCommand('createLink', false, url);
    setTimeout(updateFormattingState, 0);
  }

  const handleRemoveLink = () => {
    document.execCommand('unlink');
    setTimeout(updateFormattingState, 0);
  }

  const handleUndo = () => {
    document.execCommand('undo');
  }
  const handleRedo = () => {
    document.execCommand('redo');
  }

  const scrollToSection = (sectionId, reviewId) => {
    setTimeout(() => {
      // Find the element in the editor
      const editorElement = editorRef.current;
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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onFileUpload={handleFileUpload} onContractCreate={handleContractCreate} />
      <div className="editor-container">
        <div className="comments-sidebar">
          <div className="ai-review-header">
            <h3>AI Analysis</h3>
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
            {reviewItems.length === 0 ? (
              <li className="no-problems" style={{ 
                textAlign: 'center', 
                padding: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '100%'
              }}>
                <em>No issues detected in this contract</em>
              </li>
            ) : (
              reviewItems.map((item) => (
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
                        backgroundColor: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      title="Get AI assistance to fix this issue"
                    >
                      Fix
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          {showRecommendation && (
            <div className="recommendation-box">
              <button 
                onClick={handleCloseRecommendation}
                className="close-button"
                title="Dismiss recommendation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <p><em>⚠️ Warning: This contract contains numerous one-sided provisions that heavily favor the seller. We strongly recommend consulting with legal counsel before signing.</em></p>
            </div>
          )}
        </div>
        <div className="editor-main">
          <div className="editor-toolbar confluence-like" role="toolbar" aria-label="Document formatting tools">
            <div className="group">
              <select onChange={handleBlockChange} value={blockType} className="block-select" title="Change text style">
                <option value="P">Normal Text</option>
                <option value="H1">Title</option>
                <option value="H2">Heading</option>
                <option value="H3">Subheading</option>
              </select>
            </div>
            <div className="group">
              <button type="button" className={boldActive ? 'active' : ''} onClick={() => applyFormat('bold')} title="Make text bold"><strong>B</strong></button>
              <button type="button" className={italicActive ? 'active' : ''} onClick={() => applyFormat('italic')} title="Make text italic" style={{ fontStyle: 'italic' }}>I</button>
              <button type="button" className={underlineActive ? 'active' : ''} onClick={() => applyFormat('underline')} title="Underline text" style={{ textDecoration: 'underline' }}>U</button>
              <button type="button" className={strikeActive ? 'active' : ''} onClick={() => applyFormat('strikeThrough')} title="Strike through text" style={{ textDecoration: 'line-through' }}>S</button>
              <button type="button" className={codeActive ? 'active' : ''} onClick={toggleInlineCode} title="Format as code" style={{ fontFamily: 'monospace', fontSize: '12px' }}> {'</>'} </button>
            </div>
            <div className="group">
              <button type="button" className={blockquoteActive ? 'active' : ''} onClick={toggleBlockquote} title="Add quote block">❝</button>
              <button type="button" className={ulActive ? 'active' : ''} onClick={() => applyFormat('insertUnorderedList')} title="Create bullet list">•</button>
              <button type="button" className={olActive ? 'active' : ''} onClick={() => applyFormat('insertOrderedList')} title="Create numbered list">1.</button>
            </div>
            <div className="group">
              <button type="button" className={align === 'left' ? 'active' : ''} onClick={() => { applyFormat('justifyLeft'); }} title="Align text left">≡</button>
              <button type="button" className={align === 'center' ? 'active' : ''} onClick={() => { applyFormat('justifyCenter'); }} title="Center text">≣</button>
              <button type="button" className={align === 'right' ? 'active' : ''} onClick={() => { applyFormat('justifyRight'); }} title="Align text right">≡</button>
              <button type="button" className={align === 'justify' ? 'active' : ''} onClick={() => { applyFormat('justifyFull'); }} title="Justify text">≣</button>
            </div>
            <div className="group">
              {!linkActive && <button type="button" onClick={handleCreateLink} title="Insert hyperlink">🔗</button>}
              {linkActive && <button type="button" className="active" onClick={handleRemoveLink} title="Remove hyperlink">🔗✕</button>}
            </div>
            <div className="group">
              <button type="button" onClick={handleUndo} title="Undo last action">↺</button>
              <button type="button" onClick={handleRedo} title="Redo last action">↻</button>
            </div>
            <div className="group">
              <button type="button" onClick={() => applyFormat('removeFormat')} title="Remove all formatting">⨂</button>
            </div>
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="content-editable"
            onBlur={() => {
              if (editorRef.current) {
                setContent(editorRef.current.innerHTML);
              }
            }}
          />
        </div>
        <AIChat 
          setInputText={(fn) => { chatInputRef.current = fn; }} 
          setResetChat={(fn) => { chatResetRef.current = fn; }}
        />
      </div>
    </div>
  )
}

export default App
