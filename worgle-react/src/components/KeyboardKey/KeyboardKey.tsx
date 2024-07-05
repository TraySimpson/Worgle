import { KeyStatus } from '../../enums/KeyStatus';
import './KeyboardKey.css';

export default function KeyboardKey({letter, status, onClick} : {letter: string, status: KeyStatus, onClick: () => void}) {
    function getClasses() {
        switch (status) {
            case KeyStatus.USED:
                return 'keyboard-key used';
            case KeyStatus.CORRECT:
                return 'keyboard-key correct';
            default:
                return 'keyboard-key';
        }
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