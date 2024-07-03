import './KeyboardKey.css';

export default function KeyboardKey({letter, isUsed, onClick} : {letter: string, isUsed: boolean, onClick: () => void}) {
    function getClasses() {
        return `keyboard-key ${isUsed ? 'used' : ''}`;
    }

    function getDisplayText() {
        return letter === 'Backspace' ? '←' : letter.toUpperCase();
    }

    return (
        <div className={getClasses()} onClick={onClick} >
            {getDisplayText()}
        </div>
    );
}