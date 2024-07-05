import KeyboardKey from "../KeyboardKey/KeyboardKey";
import './Keyboard.css';
import { KeyStatus } from "../../enums/KeyStatus";

export default function Keyboard({ usedLetters, secretWord, onKeyPress}: { usedLetters: string[], secretWord: string, onKeyPress: (letter: string) => void}) {
    let topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'];

    function getStatus(letter: string): KeyStatus {
        if (usedLetters.includes(letter)) {
            if (secretWord.includes(letter)) {
                return KeyStatus.CORRECT;
            }
            return KeyStatus.USED;
        }
        return KeyStatus.UNUSED;
    }

    return (
        <div className="keyboard">
            <div className="keyboard-row">
            {topRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    status={getStatus(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {middleRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    status={getStatus(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {bottomRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    status={getStatus(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
        </div>
    );
}