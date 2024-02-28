import { useState, useEffect, useContext } from 'react';
import { BookContext } from './App.jsx';

const Editor = ({ chapter }) => {
  const { book } = useContext(BookContext);
  const [shownCharsNum, setShownCharsNum] = useState(0);

  useEffect(() => {
    const handleKeyPress = () => {
      setShownCharsNum(count => count + 1);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  let charCount = 0;

  // Function to determine if a space should be added
  const shouldAddSpace = (index, array) => {
    if (index < array.length - 1) {
      // Check if next word is not a newline to add a space
      return array[index + 1].word !== "\n";
    }
    return false;
  };

  return (
    <div>
      <ol id="text-code">
        {book?.chapters?.[chapter]?.paragraphs?.map((paragraph, index_p) => (
          <li key={index_p}>
            {paragraph.content.reduce((acc, wordObj, index_w, arr) => {
              const { word, color } = wordObj;
              if (charCount < shownCharsNum) {
                if (word === "\n") {
                  acc.push(<br key={index_w} />);
                  charCount += 1; // Assuming newline counts as one character
                } else if (charCount + word.length <= shownCharsNum) {
                  acc.push(<span key={index_w} style={{ color }}>{word}</span>);
                  charCount += word.length;
                  // Add space if applicable
                  if (shouldAddSpace(index_w, arr)) {
                    acc.push(<span key={`space-${index_w}`}>&nbsp;</span>);
                    charCount += 1;
                  }
                } else {
                  // Handle partial words
                  const charsToShow = shownCharsNum - charCount;
                  acc.push(<span key={index_w} style={{ color }}>{word.slice(0, charsToShow)}</span>);
                  charCount += charsToShow;
                }
              }
              return acc;
            }, [])}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Editor;
