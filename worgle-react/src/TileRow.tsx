import Tile from './Tile';
import './TileRow.css';

const letters: string[] = [];

export default function TileRow({word, maxLetters} : {word: string, maxLetters: number}) { 
    return (
        <div className="tile-row">
            {Array.from({ length: maxLetters - letters.length }).map((_, index) => (
                <Tile key={index} letter={getLetterAt(word, index)}/>
            ))}
        </div>
    );
}

function getLetterAt(word: string, index: number) {
    return word.length > index ?
        word[index] :
        '';
}