import React, {useContext, useRef } from 'react';
import { BookContext } from './App.jsx'
import { startRead } from './book_beautifier';

const Tabbar = ({ tabs, setActiveTab, activeTab, handleFileSelect, fileInputRef }) => {
  const { setBook } = useContext(BookContext);


  return (
    <div className="tab-bar">
      <ul className='tab-list'>
        {tabs.map((tab, indx) => (
          <li
            key={tab.id}
            className={`tab ${tab.id === activeTab ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{`${indx + 1}. ${tab.title}`}</span>
            <span>&times;</span>
          </li>
        ))}
      </ul>
      <input type="file" onChange={handleFileSelect} ref={fileInputRef} style={{ display: 'none' }} />
      <button onClick={() => fileInputRef.current.click()}>Upload Book</button>

    </div>
  );
};

export default Tabbar;
