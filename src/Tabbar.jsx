import React, { useState } from 'react';

// Example Tab Data
const tabs = [
  { id: 1, title: 'Home', content: 'Home Page' },
  { id: 2, title: 'About', content: 'About Page' },
  { id: 3, title: 'Contact', content: 'Contact Page' }
];

const Tabbar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

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
