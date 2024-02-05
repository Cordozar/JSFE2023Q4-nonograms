import wordList from './word-list.js';

class HangmanBlock {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('hangman-block');

    this.img = document.createElement('img');
    this.img.classList.add('hangman-block__img');
    this.img.src = './img/gallows.svg';
    this.img.alt = 'gallows';

    this.title = document.createElement('h1');
    this.title.classList.add('title');
    this.title.textContent = 'Hangman Game';

    this.element.append(this.img);
    this.element.append(this.title);
  }
}

class GameBlock {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('game-block');

    this.wordDisplay = document.createElement('ul');
    this.wordDisplay.classList.add('game-block__word-display');

    this.hint = document.createElement('p');
    this.hint.classList.add('game-block__hint');
    this.hint.innerHTML =
      'Hint: <span class="game-block__hint-text bold"></span>';

    this.guess = document.createElement('p');
    this.guess.classList.add('game-block__guess');
    this.guess.innerHTML =
      'Incorect guesses: <span class="bold bold_red"></span>';

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('game-block__keybord');

    this.element.append(this.wordDisplay);
    this.element.append(this.hint);
    this.element.append(this.guess);
    this.element.append(this.keyboard);
  }
}

class Modal {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('modal');

    this.content = document.createElement('div');
    this.content.classList.add('modal__content');

    this.img = document.createElement('img');
    this.img.classList.add('modal__img');
    this.img.src = './img/lose.gif';
    this.img.alt = 'result';

    this.result = document.createElement('span');
    this.result.classList.add('modal__result');

    this.text = document.createElement('p');
    this.text.classList.add('modal__text');

    this.answer = document.createElement('span');
    this.answer.classList.add('modal__answer');

    this.restartBtn = document.createElement('button');
    this.restartBtn.classList.add('modal__restart');
    this.restartBtn.textContent = 'Play Again';

    this.content.append(this.img);
    this.content.append(this.result);
    this.content.append(this.text);
    this.text.append(this.answer);
    this.content.append(this.restartBtn);

    this.element.append(this.content);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');

  const container = document.createElement('div');
  container.classList.add('container');

  const hangmanBlock = new HangmanBlock();
  const gameBlock = new GameBlock();
  const modalBlock = new Modal();

  container.append(hangmanBlock.element);
  container.append(gameBlock.element);
  body.append(container);
  body.append(modalBlock.element);

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

    document
      .querySelectorAll('.hangman-block__limb')
      .forEach((el) => el.remove());

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

  function gameOver(boolean) {
    setTimeout(() => {
      let modalText;
      if (boolean) {
        modalText = 'You guessed the word: ';
      } else {
        modalText = 'The right word was: ';
      }

      let imagePath;
      if (boolean) {
        imagePath = './img/win.gif';
      } else {
        imagePath = './img/lose.gif';
      }

      const modalImg = modal.querySelector('.modal__img');
      const modalResult = modal.querySelector('.modal__result');
      const modalTextElement = modal.querySelector('.modal__text');

      modalImg.src = imagePath;
      modalResult.innerText = boolean ? 'You Win!' : 'Game Over!';
      modalTextElement.innerHTML = `${modalText}<span class="modal__answer">${currentWord}</span>`;

      modal.classList.add('show');
    }, 300);
  }

  function initGame(button, clickedLetter) {
    currentWord.split('').forEach((letter, index) => {
      if (letter === clickedLetter) {
        button.classList.add('game-block__char_valid');
        correctLetters.push(letter);
        const letters = wordDisplay.querySelectorAll('li');
        letters[index].innerText = letter;
        letters[index].classList.add('game-block__letter_guessed');
      }
    });

    if (!currentWord.includes(clickedLetter)) {
      wrongGuessCount += 1;
      button.classList.add('game-block__char_invalid');
      hangmanImage.insertAdjacentHTML(
        'afterend',
        `<div class="hangman-block__limb hangman-block__limb_${wrongGuessCount}"></div>`
      );
    }

    button.disabled = true;
    wrongGuesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (
      wrongGuessCount === maxGuesses ||
      correctLetters.length === currentWord.length
    ) {
      gameOver(wrongGuessCount === maxGuesses ? false : true);
    }
  }

  const startCharCode = 'a'.charCodeAt(0);
  const endCharCode = 'z'.charCodeAt(0);

  for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
    const letter = String.fromCharCode(charCode);

    const button = document.createElement('button');
    button.classList.add('game-block__char');
    button.innerHTML = letter;
    keyboard.append(button);

    button.addEventListener('click', (e) => initGame(e.target, letter));
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

  const startCharCodeRus = 'а'.charCodeAt(0);
  const endCharCodeRus = 'я'.charCodeAt(0);

  const rusAlphabet = [];

  for (let i = startCharCodeRus; i <= endCharCodeRus; i++) {
    rusAlphabet.push(String.fromCharCode(i));
  }

  function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    if (rusAlphabet.includes(key)) {
      alert('Switch to the English keyboard');
    }

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
