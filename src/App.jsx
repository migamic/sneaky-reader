import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from './Upload.jsx'

function App() {
  const [text, setText] = useState('Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.')

  return (
    <>
      <div class="editor-container">
        <div class="sidebar">
          <ul class="file-list">
            <li>index.html</li>
            <li>style.css</li>
            <li>script.js</li>
          </ul>
        </div>
        <div>
          <div class="title-bar">
            <span class="title">Sublime Text Clone</span>
            <div class="window-controls">
              <button class="window-btn minimize-btn"></button>
              <button class="window-btn maximize-btn"></button>
              <button class="window-btn close-btn"></button>
            </div>
          </div>
          <div class="editor-area">
            <p>Hello, this is a Sublime Text clone!</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
