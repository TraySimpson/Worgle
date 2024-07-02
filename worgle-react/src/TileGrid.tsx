import TileRow from "./TileRow";
import { TileData, TileStatus } from "./TileStatus";
import { useEffect, useState } from 'react';

const numberOfRows: number = 6;
const maxLetters: number = 5;

export default function TileGrid() {
    const [guesses, setGuesses] = useState<TileData[][]>([[]]);
    const [secretWord, setSecretWord] = useState("SHARP");

    const lastWord = guesses[guesses.length - 1].map(tile => tile.letter).join('');
    const isGameWon = lastWord === secretWord;
    const isGameLost = !isGameWon && (
        guesses.length === numberOfRows && lastWord.length === maxLetters);
    const isGameOver = isGameLost || isGameWon;

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        console.log("using effect!");
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    function getGuessAtIndex(index: number) {
        return guesses.length > index ?
            guesses[index] :
            [];
    }
    
    function handleKeyPress(event: KeyboardEvent) {
        if (isGameOver) {
            return;
        }
        try {
            let letter = event.key;
            checkLetter(letter);
            letter = letter.toUpperCase();
            addLetterToGuesses(letter);
            checkForWord();
        } catch (e) {
            if (e instanceof InvalidLetterException) {
                console.error('Invalid letter!');
            } else if (e instanceof InvalidWordException) {
                console.error('Invalid word!');
            } else {
                console.error(Error);
            }
        }
      }
      
      function checkLetter(letter: string) {
        if (letter.length !== 1) {
            throw new Error('Invalid letter length');
        }
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(letter)) {
            throw new InvalidLetterException();
        }
      }
      
      function addLetterToGuesses(letter: string) {
        if (lastWord.length === maxLetters) {
            if (guesses.length === numberOfRows) {
                throw new Error('No more guesses left');
            }
            setGuesses([...guesses, [new TileData(letter, TileStatus.DEFAULT)]]);
        } else {
            setGuesses([...guesses.slice(0, guesses.length - 1), 
                [...guesses[guesses.length - 1], new TileData(letter, TileStatus.DEFAULT)]
            ]);
        }
      }
      
      function checkForWord() {
        if (lastWord.length !== maxLetters)
            return;
        if (!validateLastWord())
            throw new InvalidWordException();
      }
      
      function validateLastWord() {
        // TODO lookup words in dictionary
        // Also don't allow guesses that are already guessed
        return true;
      }
      
    return (
        <div className="tile-grid">
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <TileRow 
                    key={index} 
                    word={getGuessAtIndex(index)}
                    maxLetters={maxLetters}
                />
            ))}
        </div>
    );
}


  
  class InvalidLetterException extends Error {
    constructor() {
        super('Invalid letter');
    }
  }
  
  class InvalidWordException extends Error {
    constructor() {
        super('Invalid word');
    }
  }