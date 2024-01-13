import wordList from './word-list.js';

window.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.querySelector('.game-block__word-display');
  const keyboard = document.querySelector('.game-block__keybord');
  const wrongGuesses = document.querySelector('.bold_red');

  let currentWord;
  let wrongGuessCount = 0;
  const maxGuesses = 6;

  function getRandomWord() {
    const { word, hint } =
      wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector('.game-block__hint-text').innerText = hint;
    wordDisplay.innerHTML = word
      .split('')
      .map(() => '<li class="game-block__letter"></li>')
      .join('');
  }

  getRandomWord();

  function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
          const letters = wordDisplay.querySelectorAll('li');
          letters[index].innerText = letter;
          letters[index].classList.add('game-block__letter_guessed');
        }
      });
    } else {
      wrongGuessCount += 1;
    }
    wrongGuesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  }

  const startCharCode = 'a'.charCodeAt(0);
  const endCharCode = 'z'.charCodeAt(0);

  for (let i = startCharCode; i <= endCharCode; i++) {
    const button = document.createElement('button');
    button.classList.add('game-block__char');
    button.innerHTML = String.fromCharCode(i);
    keyboard.append(button);

    button.addEventListener('click', (e) =>
      initGame(e.target, String.fromCharCode(i))
    );
  }

  
});
