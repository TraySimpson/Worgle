"use strict";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

let secretWord = 'HELLO';
let guesses = [ [ ] ];

function init() {
    let grid = document.querySelector('#guessing-grid');
    document.addEventListener("keydown", handleKeyPress);

    for (let i = 0; i < MAX_GUESSES; i++) {
        let row = document.createElement('div');
        row.classList.add('guess-row');
        for (let j = 0; j < WORD_LENGTH; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function handleKeyPress(e) {
    try {
        let letter = e.key;
        checkLetter(letter);
        letter = letter.toUpperCase();
        addLetterToGuesses(letter);
        renderLetter();
        checkForWord();
    } catch (e) {
        if (e instanceof InvalidLetterException) {
            displayError('Invalid letter!');
        } else if (e instanceof InvalidWordException) {
            displayError('Invalid word!');
        } else {
            console.error(Error);
        }
    }
}

function checkLetter(letter) {
    if (letter.length !== 1) {
        throw new Error('Invalid letter length');
    }
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(letter)) {
        throw new InvalidLetterException();
    }
}

function addLetterToGuesses(letter) {
    let latestWord = guesses[guesses.length - 1];
    if (latestWord.length === WORD_LENGTH) {
        if (guesses.length === MAX_GUESSES) {
            throw new Error('No more guesses left');
        }
        guesses.push([letter]);
    } else {
        guesses[guesses.length - 1] = [...latestWord, letter];
    }
}

function checkForWord() {
    let latestWord = guesses[guesses.length - 1];
    if (latestWord.length !== WORD_LENGTH)
        return;
    let word = latestWord.join('');
    if (!validateWord(word))
        throw new InvalidWordException();
    renderWordColors(word);
}

function validateWord(word) {
    // TODO lookup words in dictionary
    // Also don't allow guesses that are already guessed
    return true;
}

function renderLetter() {
    let grid = document.querySelector('#guessing-grid');
    for(let i = 0; i < guesses.length; i++) {
        let row = grid.children[i];
        let word = guesses[i];
        for(let j = 0; j < word.length; j++) {
            let cell = row.children[j];
            cell.textContent = word[j];
        }
    }
}

function renderWordColors(word) {
    let grid = document.querySelector('#guessing-grid');
    let row = grid.children[guesses.length - 1];
    for(let i = 0; i < word.length; i++) {
        let cell = row.children[i];
        cell.classList.add('cell-' + getCellColorClass(word[i], i));
    }
}

function getCellColorClass(letter, index) {
    let correctLetter = secretWord[index];
    if (letter === correctLetter) {
        return 'correct';
    } else if (secretWord.includes(letter)) {
        return 'wrong-place';
    } else {
        return 'incorrect';
    }
}

function displayError(message) {
    let error = document.querySelector('#error');
    error.textContent = message;
    error.style.display = 'block';
    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);
}



init();

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
