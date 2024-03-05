import { useState, useEffect, createContext, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import Iconbar from './Iconbar.jsx'
import { startRead } from './book_beautifier';

export const BookContext = createContext({
  book: null,
  setBook: () => {}
});
// Example Tab Data
const tabs = [
  { id: 1, title: 'Text', content: 'Home Page' },
  { id: 2, title: 'About', content: 'About Page' },
  { id: 3, title: 'Contact', content: 'Contact Page' }
];

function App() {
  const [book, setBook] = useState({ chapters: []});
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      startRead(file, setBook);
    }
  };

  return (
    <>
      <BookContext.Provider value={{ book, setBook }}>



        <div>
          <Tabbar
            activeTab={activeTab}
            tabs={tabs}
            setActiveTab={setActiveTab}
            handleFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
          />
        </div>
        <div className="icon-bar"><Iconbar/></div>
        <div className="sidebar">
          <Sidebar activeChapter={activeChapter} setActiveChapter={setActiveChapter}/>
        </div>
        <div className="editor">
        {
          {
            1: <Editor chapter={activeChapter}/>,
            2: <About />,
            3: <Contact />
          }[activeTab]
        }

        </div>
        <div className='bottomBar'>
          <div className='accentBar'>
            Jaimito SL.
          </div>
        </div>
      </BookContext.Provider>
    </>
  )
}

export default App
