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
      {bookText && bookText.chapters && console.log(JSON.stringify(bookText.chapters[0])) }
      {bookText && bookText.chapters && 
        <div>
          {JSON.stringify(bookText.chapters[chapter])}
        </div>
      }
    </div>

  );
};

export default Editor
