import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'

function App() {
  const [text, setText] = useState('Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.')

  return (
    <>
      <div className="tab-bar">
        <Tabbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div class="editor">
        <Editor />
        <p>Hello, this is a Sublime Text clone!</p>
      </div>
    </>
  )
}

export default App
