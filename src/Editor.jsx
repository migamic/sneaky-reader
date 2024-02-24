import { useState, useEffect, useContext } from 'react'
import { BookContext } from './App.jsx'

const Editor = ( {chapter} ) => {
  const bookText = useContext(BookContext);
  const [shownWordsNum, setShownWordsNum] = useState(20);

  useEffect(() => {
        const handleKeyPress = () => {
            setShownWordsNum(count => count < bookText.length ? count + 1 : count);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


  return (
    <div>
      {bookText && bookText.chapters && console.log(JSON.stringify(bookText.chapters[0].content)) }
      {bookText && bookText.chapters && bookText.chapters[chapter].content.map((paragraph, index_p) => (
        <p key={index_p}>
          {paragraph.paragraph.map((word, index_w) => (
            <span key={index_w} style={{ color: word.color }}>{word.word} </span>
          ))}
        </p>
      ))}
    </div>

  );
};

export default Editor
