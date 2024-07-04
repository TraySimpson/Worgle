import AlertMessage from "./AlertMessage";
import Keyboard from "./Keyboard";
import TileRow from "./TileRow";
import { TileData, TileStatus } from "./TileStatus";
import { useEffect, useState } from 'react';


export default function TileGrid({numberOfRows, maxLetters, dictionary, secretWord}: {numberOfRows: number, maxLetters: number, dictionary: string[], secretWord: string}) {
    const [guesses, setGuesses] = useState<TileData[][]>([[]]);

    const guessedWords = guesses.map(word => word.map(tile => tile.letter).join(''));
    const lastWord = guessedWords[guessedWords.length - 1];
    const lastWordErrored = guesses.length > 0 && guesses[guesses.length - 1].some(tile => tile.status === TileStatus.ERROR);
    const fullGuessWords = lastWord.length === maxLetters && !lastWordErrored ?
        guessedWords :
        guessedWords.slice(0, guessedWords.length - 1);
    const isGameWon = lastWord === secretWord;
    const isGameLost = !isGameWon && (
        guesses.length === numberOfRows && lastWord.length === maxLetters) &&
        !lastWordErrored;
    const isGameOver = isGameLost || isGameWon;
    const canBackspace = lastWordErrored || (lastWord.length > 0 && lastWord.length < maxLetters);

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
            if (letter === 'Backspace') {
                if (!canBackspace)
                    return;
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
            if (lastWordErrored) {
                return [...guesses.slice(0, guesses.length - 1), [new TileData(letter, TileStatus.DEFAULT)]];
            }
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
                return new TileData(tile.letter, TileStatus.INCORRECT);
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
        return dictionary.includes(word.toLowerCase()) && 
            !guessedWords.slice(0, guessedWords.length - 1).includes(word);
      }

      function getMessage(): {message: string, type: string} {
        if (isGameWon) {
            return {message: "You win!", type: "success"};
        }
        if (isGameLost) {
            return {message: `Game over. Answer: ${secretWord}`, type: "error"};
        }
        if (lastWordErrored) {
            return {message: "Incorrect spelling. Try again!", type: "error"};
        }
        return {message: "", type: ""};
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
            <AlertMessage
                message={getMessage().message}
                type={getMessage().type}
                duration={2000}
            />
            <Keyboard 
                usedLetters={fullGuessWords.map(word => word.split('')).flat()}
                onKeyPress={handleKey}
                secretWord={secretWord}
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