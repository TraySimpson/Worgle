import Tile from '../Tile/Tile';
import { TileData } from '../../enums/TileStatus';
import './TileRow.css';

export default function TileRow({word, maxLetters} : {word: TileData[], maxLetters: number}) {

    function getDataAtIndex(index: number) {
        return word.length > index ?
            word[index] :
            new TileData('', 0);
    }

    return (
        <div className="tile-row">
            {Array.from({ length: maxLetters }).map((_, index) => (
                <Tile 
                    key={index}
                    tile={getDataAtIndex(index)}
                />
            ))}
        </div>
    );
}