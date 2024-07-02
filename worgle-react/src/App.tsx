import './App.css';
import TileGrid from './TileGrid';

function App() {
  return (
    <div 
      className="App">
      <TileGrid
        numberOfRows={6}
        maxLetters={5}
      />
    </div>
  );
}

export default App;
