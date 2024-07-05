This project is a simple Wordle clone web app :)

### worgle-react
##### Run with Docker
```
cd worgle-react
docker build -t worgle-react-app .
docker run -p 3000:3000 worgle-react-app
```
##### Run as a heretic (Non-Docker)
1. `cd worgle-react`
2. `npm start`

### TO DO
- [X] Add dictionary check to validate words
- [X] Add click handler for onscreen keyboard
- [X] Add backspace button on screen
- [X] Fix incorrect words going to next row
- [X] Randomly pick word
- [X] Alert bar for invalid word
- [X] Alert bar win message
- [X] Refactor CSS with variables
- [X] Refactor components for readability
- [ ] Create fadeout for messages
- [X] Tile animation for reveal
- [ ] Add keydown event listener only on load
- [ ] Add definitions after game finishes
- [ ] Add definitions
- [ ] Rework dictionary?
- [ ] Make secure HTTPS?
- [X] Add Docker