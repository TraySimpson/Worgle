import React from 'react';
import './App.css';
import TileGrid from './TileGrid';

function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
  console.log(event.key);
}

function App() {
  return (
    <div 
      className="App"
      onKeyDown={handleKeyDown}>
      <TileGrid/>
    </div>
  );
}

export default App;
