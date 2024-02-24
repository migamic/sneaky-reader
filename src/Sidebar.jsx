import React, { useState } from 'react';

// Example array of file names, replace or populate this dynamically as needed
const files = ['chapter1.html', 'chapter2.css', 'chapter3.js'];

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const getItemStyle = (itemName) => hoveredItem === itemName ? styles.fileItemHover : styles.fileItem;
  const getFileEmoji = (fileName) => {
    if (fileName.endsWith('.html')) return '🌐';
    if (fileName.endsWith('.css')) return '🎨';
    if (fileName.endsWith('.js')) return '📜';
    return '📄'; // Default emoji
  };

  return (
    <ul className="side-list">
      {files.map((file, index) => (
        <li
          key={index}
          className="side-item"
          onMouseEnter={() => setHoveredItem(file)}
          onMouseLeave={() => setHoveredItem(null)}
        >
        {getFileEmoji(file)}   {file}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
