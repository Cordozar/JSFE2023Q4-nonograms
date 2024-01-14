import wordList from './word-list.js';

window.addEventListener('DOMContentLoaded', () => {
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
  }

  function getRandomWord() {
    const hintText = document.querySelector('.game-block__hint-text');
    if (!+localStorage.getItem('isExist')) {
      let uniqueWord = false;
      let word;
      let hint;

      while (!uniqueWord) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[randomIndex].word;
        hint = wordList[randomIndex].hint;

        if (word !== localStorage.getItem('word')) {
          uniqueWord = true;
        }
      }

      currentWord = word;
      hintText.innerText = hint;
      localStorage.setItem('isExist', 1);
      localStorage.setItem('word', word);
      localStorage.setItem('hint', hint);
      console.log(word);
    } else {
      currentWord = localStorage.getItem('word');
      hintText.innerText = localStorage.getItem('hint');
      console.log(currentWord);
    }
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
  }

  document.addEventListener('keydown', handleKeyPress);

  restartBtn.addEventListener('click', () => {
    localStorage.setItem('isExist', 0);
    getRandomWord();
  });
});
