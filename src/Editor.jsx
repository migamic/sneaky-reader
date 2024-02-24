import { useState, useEffect, useContext } from 'react'
import { BookContext } from './App.jsx'

const Editor = ( {chapter} ) => {
  const bookText = useContext(BookContext);
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
  return (
    <div>
      <ol id="text-code">
      {bookText && bookText.chapters && bookText.chapters[chapter].content.map((paragraph, index_p) => (
        <li key={index_p}>
          {paragraph.paragraph.map((word, index_w) => {
            if (charCount < shownCharsNum) {
              if (charCount + word.word.length < shownCharsNum) {
                charCount = charCount+word.word.length;
                return <span key={index_w} style={{ color: word.color }}>{word.word} </span>;
              } else {
                var charsToDraw = shownCharsNum-charCount;
                charCount = shownCharsNum;
                return <span key={index_w}>{word.word.slice(0,charsToDraw)} </span>;
              }
            }
            return null;
          })}
        </li>
      ))}
      </ol>
    </div>
  );
};

export default Editor
