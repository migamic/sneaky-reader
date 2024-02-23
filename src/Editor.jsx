import { useState, useEffect, useContext } from 'react'
import { BookContext } from './App.jsx'

const Editor = ( {text} ) => {
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
      {bookText.slice(0, shownWordsNum).map((word, index) => (
        <span key={index}>{word} </span>
      ))}
    </div>

  );
};

export default Editor
