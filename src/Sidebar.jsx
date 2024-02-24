import { useState, useContext } from 'react'
import { BookContext } from './App.jsx'

const Sidebar = ( {activeChapter, setActiveChapter}) => {
  const bookText = useContext(BookContext);

  const emojis = ['🌐', '🎨', '📜', '📄'];

  return (
    <ul className="side-list">
      {bookText && bookText.chapters && bookText.chapters.map((chapter, index) => (
        <li key={index} className={`side-item ${index===activeChapter ? "active-item" : ""}`} title={chapter.title} onClick={() => setActiveChapter(index)}>
          {emojis[index % emojis.length]}   {chapter.title}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
