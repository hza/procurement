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
    content: '<p>Hello World! 🌍️</p>',
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
