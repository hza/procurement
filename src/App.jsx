import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import 'prosemirror-view/style/prosemirror.css'
import './App.css'

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌍️</p>',
  })

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  )
}

export default App
