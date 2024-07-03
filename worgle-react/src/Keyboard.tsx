import KeyboardKey from "./KeyboardKey";
import './Keyboard.css';

export default function Keyboard({ usedLetters, onKeyPress}: { usedLetters: string[], onKeyPress: (letter: string) => void}) {
    let topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    return (
        <div className="keyboard">
            <div className="keyboard-row">
            {topRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    isUsed={usedLetters.includes(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {middleRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    isUsed={usedLetters.includes(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {bottomRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    isUsed={usedLetters.includes(letter)}
                    onClick={() => onKeyPress(letter)}
                />
            ))}
            </div>
        </div>
    );
}