import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'

export const BookContext = createContext();

function App() {
  const [text, setText] = useState(["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit.", "\n", "Sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua.", "\n", "Ut", "enim", "ad", "minim", "veniam,", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat.", "\n", "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur.", "\n", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident,", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum."])

  return (
    <>
      <BookContext.Provider value={text}>
        <div className="tab-bar">
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
