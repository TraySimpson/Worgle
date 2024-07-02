import './KeyboardKey.css';

export default function KeyboardKey({letter, isUsed, onClick} : {letter: string, isUsed: boolean, onClick: () => void}) {
    function getClasses() {
        return `keyboard-key ${isUsed ? 'used' : ''}`;
    }

    return (
        <div 
            className={getClasses()}
            onClick={onClick}
        >
            {letter.toUpperCase()}
        </div>
    );
}