import TileRow from "./TileRow";
import { useState } from 'react';

const numberOfRows: number = 6;
const maxLetters: number = 5;

export default function TileGrid() {
    const [guesses, setGuesses] = useState([""]);
    document.addEventListener("keydown", handleKeyPress);

    function getGuessAtIndex(guesses: string[], index: number) {
        return guesses.length > index ?
            guesses[index] :
            '';
    }
    
    function handleKeyPress(event: KeyboardEvent) {
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
        let latestWord = guesses.length > 0 ?
            guesses[guesses.length - 1] :
            "";
        if (latestWord.length === maxLetters) {
            if (guesses.length === numberOfRows) {
                throw new Error('No more guesses left');
            }
            let newGuesses = guesses;
            newGuesses.push(letter);
            setGuesses(newGuesses);
        } else {
            let newGuesses = guesses;
            newGuesses[newGuesses.length-1] = newGuesses[newGuesses.length-1] + letter;
            setGuesses(newGuesses);
        }
      }
      
      function checkForWord() {
        let latestWord = guesses[guesses.length - 1];
        if (latestWord.length !== maxLetters)
            return;
        if (!validateWord(latestWord))
            throw new InvalidWordException();
      }
      
      function validateWord(word: string) {
        // TODO lookup words in dictionary
        // Also don't allow guesses that are already guessed
        return true;
      }
      
    return (
        <div className="tile-grid">
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <TileRow 
                    key={index} 
                    word={getGuessAtIndex(guesses, index)}
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