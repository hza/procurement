import React, { useRef, useEffect } from 'react'

function Editor({ 
  content, 
  setContent, 
  currentReviewItems, 
  selectedSection, 
  setSelectedSection,
  chatInputRef,
  analyzerType 
}) {
  const editorRef = useRef(null)
  
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
    const reviewItem = currentReviewItems.find(item => item.id === reviewId);
    if (reviewItem && chatInputRef.current) {
      const fixText = analyzerType === 'negotiation' 
        ? `Negotiate this: ${reviewItem.title} - ${reviewItem.description}`
        : `Fix this issue: ${reviewItem.title} - ${reviewItem.description}`;
      chatInputRef.current(fixText);
    }
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

  // Expose editor reference for external access
  useEffect(() => {
    if (editorRef.current) {
      // Make editorRef available to parent component for file upload and contract creation
      window.editorRef = editorRef;
    }
  }, []);

  return (
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
  )
}

export default Editor