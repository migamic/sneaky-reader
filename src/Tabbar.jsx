import React, { useState } from 'react';

const Tabbar = ({ tabs, setActiveTab, activeTab }) => {

  return (
    <div className="tab-bar">
      <ul className='tab-list'>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab ${tab.id === activeTab ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
        
      </ul>
      <button className="upload-btn">Upload</button> {/* Add a CSS class if needed */}
    </div>
  );
};

export default Tabbar;
