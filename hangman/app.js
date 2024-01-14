import wordList from './word-list.js';

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');

  body.innerHTML = `<div class="container">
                      <div class="hangman-block">
                        <img class="hangman-block__img" src="./img/gallows.svg" alt="gallows">
                        <h1 class="title">Hangman Game</h1>
                      </div>
                      <div class="game-block">
                        <ul class="game-block__word-display"></ul>
                        <p class="game-block__hint">
                          Hint: <span class="game-block__hint-text bold"></span>
                        </p>
                        <p class="game-block__guess">
                          Incorect guesses: <span class="bold bold_red"></span>
                        </p>
                        <div class="game-block__keybord">
                        </div>
                      </div>
                    </div>
                    <div class="modal">
                      <div class="modal__content">
                        <img class="modal__img" src="./img/lose.gif" alt="result">
                        <span class="modal__result"></span>
                        <p class="modal__text"><span class="modal__answer"></span></p>
                        <button class="modal__restart">Play Again</button>
                      </div>
                    </div>`;

  const hangmanImage = document.querySelector('.hangman-block__img');
  const wordDisplay = document.querySelector('.game-block__word-display');
  const keyboard = document.querySelector('.game-block__keybord');
  const wrongGuesses = document.querySelector('.bold_red');
  const modal = document.querySelector('.modal');
  const restartBtn = document.querySelector('.modal__restart');

  let currentWord;
  let wrongGuessCount;
  let correctLetters;
  const maxGuesses = 6;

  function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    document.querySelectorAll('.hangman-block__limb').forEach((el) => {
      el.outerHTML = '';
    });
    wrongGuesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    document.querySelectorAll('.game-block__char').forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove(
        'game-block__char_valid',
        'game-block__char_invalid'
      );
    });
    wordDisplay.innerHTML = currentWord
      .split('')
      .map(() => '<li class="game-block__letter"></li>')
      .join('');
    modal.classList.remove('show');
    document.addEventListener('keydown', handleKeyPress);
  }

  function getRandomWord() {
    let uniqueWord = false;
    let word;
    let hint;

    while (!uniqueWord) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      word = wordList[randomIndex].word;
      hint = wordList[randomIndex].hint;

      if (word !== localStorage.getItem('wordCordozar')) {
        uniqueWord = true;
      }
    }

    currentWord = word;
    document.querySelector('.game-block__hint-text').innerText = hint;
    localStorage.setItem('wordCordozar', word);
    console.log(word);
    resetGame();
  }

  getRandomWord();

  function gameOver(isVictory) {
    setTimeout(() => {
      const modalText = isVictory
        ? 'You guessed the word: '
        : 'The right word was: ';
      modal.querySelector('.modal__img').src = `./img/${
        isVictory ? 'win' : 'lose'
      }.gif`;
      modal.querySelector('.modal__result').innerText = `${
        isVictory ? 'You Win!' : 'Game Over!'
      }`;
      modal.querySelector(
        '.modal__text'
      ).innerHTML = `${modalText}<span class="modal__answer">${currentWord}</span>`;
      modal.classList.add('show');
    }, 300);
  }

  function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
      button.classList.add('game-block__char_valid');
      [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
          correctLetters.push(letter);
          const letters = wordDisplay.querySelectorAll('li');
          letters[index].innerText = letter;
          letters[index].classList.add('game-block__letter_guessed');
        }
      });
    } else {
      wrongGuessCount += 1;
      button.classList.add('game-block__char_invalid');
      hangmanImage.insertAdjacentHTML(
        'afterend',
        `<div class="hangman-block__limb hangman-block__limb_${wrongGuessCount}"></div>`
      );
    }

    button.disabled = true;
    wrongGuesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) {
      gameOver(false);
    }
    if (correctLetters.length === currentWord.length) {
      gameOver(true);
    }
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

  function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    const pressKey = Array.from(
      document.querySelectorAll('.game-block__char')
    ).filter((btn) => btn.innerText.toLowerCase() === key && !btn.disabled);
    if (pressKey.length) {
      initGame(pressKey[0], key);
    }
    if (wrongGuessCount === 6) {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }

  document.addEventListener('keydown', handleKeyPress);

  restartBtn.addEventListener('click', () => {
    console.clear();
    getRandomWord();
  });
});
