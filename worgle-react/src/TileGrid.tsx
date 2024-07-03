import Keyboard from "./Keyboard";
import TileRow from "./TileRow";
import { TileData, TileStatus } from "./TileStatus";
import { useEffect, useState } from 'react';


export default function TileGrid({numberOfRows, maxLetters, dictionary}: {numberOfRows: number, maxLetters: number, dictionary: string[]}) {
    const [guesses, setGuesses] = useState<TileData[][]>([[]]);
    const [secretWord, setSecretWord] = useState("REACT");

    const lastWord = guesses[guesses.length - 1].map(tile => tile.letter).join('');
    const isGameWon = lastWord === secretWord;
    const isGameLost = !isGameWon && (
        guesses.length === numberOfRows && lastWord.length === maxLetters);
    const isGameOver = isGameLost || isGameWon;
    const canBackspace = lastWord.length > 0 && lastWord.length < maxLetters;

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
        let letter = event.key;
        handleKey(letter);
      }

      function handleKey(letter: string) {
        try {
            if (letter === 'Backspace' && canBackspace) {
                const lastWord = [...guesses[guesses.length - 1]];
                setGuesses([...guesses.slice(0, guesses.length - 1),
                    lastWord.slice(0, lastWord.length - 1)]);
            } else {
                checkLetter(letter);
                letter = letter.toUpperCase();
                let state = addLetterToGuesses(letter);
                state = checkForWord(state);
                setGuesses(state);
            }
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
            return [...guesses, [new TileData(letter, TileStatus.DEFAULT)]];
        } else {
            return [...guesses.slice(0, guesses.length - 1), 
                [...guesses[guesses.length - 1], new TileData(letter, TileStatus.DEFAULT)]
            ];
        }
      }
      
      function checkForWord(state: TileData[][]): TileData[][] {
        const wordToCheck = state[state.length - 1];
        if (wordToCheck.length !== maxLetters) {
            return state;
        }
        if (!validateLastWord(wordToCheck.map(tile => tile.letter).join(''))) {
            const newWord = wordToCheck.map((tile) => {
                return new TileData(tile.letter, TileStatus.ERROR);
            });
            return [...state.slice(0, state.length - 1), newWord];
        }
        const newWord = wordToCheck.map((tile, index) => {
            if (tile.letter === secretWord[index]) {
                return new TileData(tile.letter, TileStatus.CORRECT);
            } else if (letterIsWrongPlace(tile.letter, index, wordToCheck)) {
                return new TileData(tile.letter, TileStatus.WRONG_PLACE);
            } else {
                return new TileData(tile.letter, TileStatus.DEFAULT);
            }});
        return [...state.slice(0, state.length - 1), newWord];
      }

      function letterIsWrongPlace(letter: string, index: number, word: TileData[]): boolean {
        const occurencesInSecret = secretWord.split('').filter((l) => l === letter).length;
        return secretWord.includes(letter) && 
            word.slice(0, index).filter((tile) => tile.letter === letter).length < occurencesInSecret &&
            word.filter((tile, letterIndex) => letterIndex > index && tile.letter === letter && secretWord[letterIndex] === letter).length < occurencesInSecret;
      }
      
      function validateLastWord(word: string) {
        // TODO lookup words in dictionary
        // Also don't allow guesses that are already guessed
        return dictionary.includes(word.toLowerCase());
      }
      
    return (
        <>
            <div className="tile-grid">
                {Array.from({ length: numberOfRows }).map((_, index) => (
                    <TileRow 
                        key={index} 
                        word={getGuessAtIndex(index)}
                        maxLetters={maxLetters}
                    />
                ))}
            </div>
            <Keyboard 
                usedLetters={guesses.flat().map(tile => tile.letter)}
                onKeyPress={handleKey}
            />
        </>

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