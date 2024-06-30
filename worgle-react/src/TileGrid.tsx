import TileRow from "./TileRow";
import { useState } from 'react';

let numberOfRows: number = 6;

export default function TileGrid() {
    const [guesses, setGuesses] = useState(["tests", "strin"]);
    return (
        <div className="tile-grid">
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <TileRow key={index} word={getGuessAtIndex(guesses, index)}/>
            ))}
        </div>
    );
}

function getGuessAtIndex(guesses: string[], index: number) {
    return guesses.length > index ?
        guesses[index] :
        '';
}