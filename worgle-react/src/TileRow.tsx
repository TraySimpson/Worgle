import Tile from './Tile';
import './TileRow.css';

const maxLetters: number = 5;
const letters: string[] = [];

export default function TileRow() { 
    return (
        <div className="tile-row">
            {letters.map((letter, index) => 
                <Tile />
            )}
            {Array.from({ length: maxLetters - letters.length }).map((_, index) => (
                <Tile key={index} />
            ))}
        </div>
    );
}