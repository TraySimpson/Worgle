

export default function KeyboardKey({letter, isUsed, onClick} : {letter: string, isUsed: boolean, onClick: () => void}) {
    function getClasses() {
        return `keyboard-key ${isUsed ? 'used' : ''}`;
    }

    return (
        <button 
            className={getClasses()}
            onClick={onClick}
        >
            {letter.toUpperCase()}
        </button>
    );
}