// class GameGenerator {
//   constructor() {
//     this.generateGameStructure();
//   }

//   generateGameStructure() {
//     const body = document.body;

//     const gameDiv = document.createElement('div');
//     gameDiv.classList.add('game');

//     const crosswordDiv = document.createElement('div');
//     crosswordDiv.classList.add('crossword');
//     crosswordDiv.id = 'crossword';

//     const topCluesDiv = document.createElement('div');
//     topCluesDiv.classList.add('top-clues');
//     topCluesDiv.id = 'top-clues';

//     const leftCluesDiv = document.createElement('div');
//     leftCluesDiv.classList.add('left-clues');
//     leftCluesDiv.id = 'left-clues';

//     gameDiv.appendChild(crosswordDiv);
//     gameDiv.appendChild(topCluesDiv);
//     gameDiv.appendChild(leftCluesDiv);

//     const timerDiv = document.createElement('div');
//     timerDiv.classList.add('timer');

//     const picturesForm = document.createElement('form');
//     picturesForm.action = '#';
//     picturesForm.classList.add('pictures');

//     const complexitiesForm = document.createElement('form');
//     complexitiesForm.action = '#';
//     complexitiesForm.classList.add('complexities');

//     const restartButton = document.createElement('button');
//     restartButton.classList.add('restart');
//     restartButton.textContent = 'Reset game';

//     const randomButton = document.createElement('button');
//     randomButton.classList.add('random');
//     randomButton.textContent = 'Random game';

//     const modalDiv = document.createElement('div');
//     modalDiv.classList.add('modal');

//     const modalContentDiv = document.createElement('div');
//     modalContentDiv.classList.add('modal__content');

//     const modalResultSpan = document.createElement('span');
//     modalResultSpan.classList.add('modal__result');
//     modalResultSpan.textContent = 'Great! You have solved the nonogram!';

//     const modalStartButton = document.createElement('button');
//     modalStartButton.classList.add('modal__start');
//     modalStartButton.textContent = 'Play Again';

//     modalContentDiv.appendChild(modalResultSpan);
//     modalContentDiv.appendChild(modalStartButton);
//     modalDiv.appendChild(modalContentDiv);

//     body.appendChild(gameDiv);
//     body.appendChild(timerDiv);
//     body.appendChild(picturesForm);
//     body.appendChild(complexitiesForm);
//     body.appendChild(restartButton);
//     body.appendChild(randomButton);
//     body.appendChild(modalDiv);
//   }
// }

// Create an instance of the GameGenerator class to generate the structure
// new GameGenerator();