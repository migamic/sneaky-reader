import { useState, useEffect, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'

export const BookContext = createContext();

function App() {
  const [text, setText] = useState([])
  const [activeChapter, setActiveChapter] = useState([0])

  useEffect(() => {
    fetch('data/data.json')
    .then(response => response.json())
    .then(data => setText(data))
    .catch(error => console.error('Error loading data:', error));
  }, []);

  return (
    <>
      <BookContext.Provider value={text}>
        <div>
          <Tabbar />
        </div>
        <div className="sidebar">
          <Sidebar setActiveChapter={setActiveChapter}/>
        </div>
        <div className="editor">
          <Editor chapter={activeChapter}/>
        </div>
      </BookContext.Provider>
    </>
  )
}

export default App
