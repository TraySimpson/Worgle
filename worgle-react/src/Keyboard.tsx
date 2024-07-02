import KeyboardKey from "./KeyboardKey";

export default function Keyboard({ usedLetters}: { usedLetters: string[] }) {
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
                    onClick={() => console.log(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {middleRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    isUsed={usedLetters.includes(letter)}
                    onClick={() => console.log(letter)}
                />
            ))}
            </div>
            <div className="keyboard-row">
            {bottomRow.map((letter) => (
                <KeyboardKey 
                    key={letter}
                    letter={letter}
                    isUsed={usedLetters.includes(letter)}
                    onClick={() => console.log(letter)}
                />
            ))}
            </div>
        </div>
    );
}