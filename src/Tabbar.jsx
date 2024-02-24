import React, { useState } from 'react';

const Tabbar = ({ tabs, setActiveTab, activeTab }) => {

  return (
    <div className="tab-bar">
      <ul className='tab-list'>
        {tabs.map((tab,indx) => (
          <li
            key={tab.id}
            className={`tab ${tab.id === activeTab ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{`${indx+1}. ${tab.title}`}</span>
            <span>&times;</span>
          </li>
        ))}
        
      </ul>
      <button className="upload-btn">Upload</button> {/* Add a CSS class if needed */}
    </div>
  );
};

export default Tabbar;
