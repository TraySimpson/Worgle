"use strict";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

let grid = document.querySelector('#guessing-grid');

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
