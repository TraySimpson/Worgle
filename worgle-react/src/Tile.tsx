import { TileData, TileStatus } from './TileStatus';
import './Tile.css';


export default function Tile( {tile}: {tile: TileData}) {
  const { letter, status } = tile;

  function getClasses() {
    let statusClass = "";
    switch (status) {
      case TileStatus.DEFAULT:
        statusClass = "default";
        break;
      case TileStatus.CORRECT:
        statusClass = "correct";
        break;
      case TileStatus.WRONG_PLACE:
        statusClass = "wrong-place";
        break;
      case TileStatus.ERROR:
        statusClass = "error";
        break;
    }
    return `tile tile-${statusClass}`;
  }

  return (
    <div className={getClasses()}>
      {letter.toUpperCase()}
    </div>
  );
}