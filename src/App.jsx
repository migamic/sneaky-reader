import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'

export const BookContext = createContext();

function App() {
  const [text, setText] = useState('Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.')

  return (
    <>
      <BookContext.Provider value={text}>
        <div>
          <Tabbar />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="editor">
          <Editor />
        </div>
      </BookContext.Provider>
    </>
  )
}

export default App
