import React, {useContext, useRef } from 'react';
import { BookContext } from './App.jsx'
import { startRead } from './book_beautifier';

const Tabbar = ({ tabs, setActiveTab, activeTab }) => {
  const { setBook } = useContext(BookContext);
  // const fileInputRef = useRef(null);

  // const handleUploadClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleProcessClick = () => {
  //     const file = fileInputRef.current.files[0];
  //     if (file) {
  //       startRead(file, setBook); // Now passing setBook to startRead
  //     } else {
  //       alert('Please select a file first.');
  //     }
  // };

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

    </div>
  );
};

export default Tabbar;
