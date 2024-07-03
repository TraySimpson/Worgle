import { useEffect, useState } from 'react';
import './App.css';
import TileGrid from './TileGrid';

function App() {
  const [dictionary, setDictionary] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCsv() {
      console.log("fetching csv!");
      const response = await fetch('./5-letter-words.txt');
      if (!response.body)
          return;
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      setDictionary(csv.split('\n'));
    }
    fetchCsv();
  }, []);

  return (
    <div 
      className="App">
      <TileGrid
        numberOfRows={6}
        maxLetters={5}
        dictionary={dictionary}
      />
    </div>
  );
}

export default App;
