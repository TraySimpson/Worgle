import './Tile.css';

let letter: string = "A";

export default function Tile() {
  return (
    <div className="tile">
      {letter.toUpperCase()}
    </div>
  );

}