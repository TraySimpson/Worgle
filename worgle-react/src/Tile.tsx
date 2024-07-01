import './Tile.css';

export default function Tile({letter}: {letter: string}) {
  return (
    <div className="tile">
      {letter.toUpperCase()}
    </div>
  );
}