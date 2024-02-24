import { useState, useEffect, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar.jsx'
import Tabbar from './Tabbar.jsx'
import Editor from './Editor.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
export const BookContext = createContext();

// Example Tab Data
const tabs = [
  { id: 1, title: 'Home', content: 'Home Page' },
  { id: 2, title: 'About', content: 'About Page' },
  { id: 3, title: 'Contact', content: 'Contact Page' }
];

function App() {
  const [text, setText] = useState([])
  const [activeChapter, setActiveChapter] = useState(0)
  const [activeTab, setActiveTab] = useState(tabs[0].id);

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
          <Tabbar 
            activeTab={activeTab}
            tabs={tabs}
            setActiveTab={setActiveTab}
          />
        </div>
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
