import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import 'prosemirror-view/style/prosemirror.css'
import './App.css'
import Header from './components/Header'

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h1>Procurement Contract Agreement</h1>
      <p><strong>Contract Number:</strong> PC-2025-001</p>
      <p><strong>Effective Date:</strong> September 9, 2025</p>
      <p><strong>Parties Involved:</strong></p>
      <ul>
        <li><strong>Buyer:</strong> ABC Corporation, 123 Business St, City, State, ZIP</li>
        <li><strong>Seller:</strong> XYZ Suppliers Inc., 456 Supply Ave, City, State, ZIP</li>
      </ul>
      <h2>1. Scope of Work</h2>
      <p>The Seller agrees to provide the following goods and services to the Buyer:</p>
      <ul>
        <li>Supply of 500 units of high-quality office furniture, including desks, chairs, and cabinets.</li>
        <li>Installation and setup services for the aforementioned furniture.</li>
        <li>Maintenance and warranty support for a period of 2 years post-delivery.</li>
      </ul>
      <h2>2. Pricing and Payment Terms</h2>
      <p>The total contract value is $150,000.00 (One Hundred Fifty Thousand Dollars).</p>
      <p>Payment Schedule:</p>
      <ul>
        <li>30% upon contract signing: $45,000.00</li>
        <li>40% upon delivery: $60,000.00</li>
        <li>30% upon completion of installation: $45,000.00</li>
      </ul>
      <p>All payments shall be made within 30 days of invoice receipt.</p>
      <h2>3. Delivery and Timeline</h2>
      <p>Delivery shall commence within 60 days of contract execution and be completed within 90 days.</p>
      <p>Installation shall be scheduled within 14 days of delivery completion.</p>
      <h2>4. Quality Standards and Specifications</h2>
      <p>All goods must meet or exceed industry standards for durability and safety. Detailed specifications are attached as Appendix A.</p>
      <h2>5. Warranties and Liabilities</h2>
      <p>The Seller warrants that all goods are free from defects and fit for their intended purpose. Warranty period: 2 years.</p>
      <p>Liability for damages shall not exceed the contract value.</p>
      <h2>6. Termination Clause</h2>
      <p>Either party may terminate this contract with 30 days written notice in case of material breach.</p>
      <h2>7. Governing Law</h2>
      <p>This contract shall be governed by the laws of the State of [State], without regard to conflict of laws principles.</p>
      <h2>8. Signatures</h2>
      <p>Buyer: ___________________________ Date: _______________</p>
      <p>Seller: ___________________________ Date: _______________</p>
      <p>This is a comprehensive procurement contract for office furniture and related services. It includes all necessary clauses for a standard agreement between a buyer and seller in a procurement scenario.</p>
    `,
  })

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default App
