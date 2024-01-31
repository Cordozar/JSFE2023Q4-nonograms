import templates from './templates.js';

let size = 5;
const sizeCells = 30;

const template = [
  // [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  // [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],

  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  // [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],

  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 1, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
];

// Создание кроссворда

const crossword = document.querySelector('.crossword');

function createCrossword(sizeMatrix, sizeCell) {
  const matrix = [];
  crossword.style.gridTemplateColumns = `repeat(${sizeMatrix}, ${sizeCell}px)`;

  for (let i = 0; i < sizeMatrix; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < sizeMatrix; j += 1) {
      matrix[i][j] = 0;
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.cssText = `
      width: ${sizeCell}px;
      height: ${sizeCell}px;`;
      cell.setAttribute('data-cell', `${i} ${j}`);
      crossword.append(cell);
    }
  }

  return matrix;
}

let curMatrix = createCrossword(size, 30);

// Рассчет ключей

function calculateClues(matrix) {
  const arrayCluesRows = [];
  const arrayCluesCols = [];

  let maxLengthRows = 0;
  let maxLengthCols = 0;

  function countConsecutiveOnes(arr) {
    const result = [];
    let count = 0;

    for (let i = 0; i < size; i++) {
      if (arr[i] === 1) {
        count += 1;
      } else if (count > 0) {
        result.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      result.push(count);
    }

    return result;
  }

  for (let i = 0; i < size; i++) {
    const rowClues = countConsecutiveOnes(matrix[i]);
    maxLengthRows = Math.max(maxLengthRows, rowClues.length);
    arrayCluesRows.push(rowClues);
  }

  for (let col = 0; col < size; col++) {
    const colArray = [];
    for (let row = 0; row < size; row++) {
      colArray.push(matrix[row][col]);
    }
    const colClues = countConsecutiveOnes(colArray);
    maxLengthCols = Math.max(maxLengthCols, colClues.length);
    arrayCluesCols.push(colClues);
  }

  function alignArray(arr, maxLength) {
    return arr.map((clue) => {
      const prefix = Array(maxLength - clue.length).fill(0);
      return prefix.concat(clue);
    });
  }

  const alignedArrayCluesRows = alignArray(arrayCluesRows, maxLengthRows);

  const alignedArrayCluesCols = alignArray(arrayCluesCols, maxLengthCols);

  const rotateArrayCluesCols = [];

  for (let col = 0; col < maxLengthCols; col++) {
    const colArray = [];
    for (let row = 0; row < size; row++) {
      colArray.push(alignedArrayCluesCols[row][col]);
    }
    rotateArrayCluesCols.push(colArray);
  }

  return {
    maxLengthRows,
    maxLengthCols,
    rows: alignedArrayCluesRows,
    cols: rotateArrayCluesCols,
  };
}
// console.log(template);

// let result = calculateClues(template);
// console.log('Rows:', result.rows);
// console.log('Columns:', result.cols);

// Создание панелей ключей

const leftClues = document.querySelector('.left-clues');
const topClues = document.querySelector('.top-clues');

function createCluesPanel(arr, element) {
  element.style.gridTemplateColumns = `repeat(${arr[0].length}, ${sizeCells}px)`;

  for (let row = 0; row < arr.length; row += 1) {
    for (let col = 0; col < arr[row].length; col += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.cssText = `
      width: ${sizeCells}px;
      height: ${sizeCells}px;`;
      cell.setAttribute('data-cell', `${row} ${col}`);
      cell.innerText = arr[row][col] ? `${arr[row][col]}` : '';
      element.append(cell);
    }
  }
}
createCluesPanel(calculateClues(template).rows, leftClues);
createCluesPanel(calculateClues(template).cols, topClues);

// Разделение панелей красной сеткой

function splitMatrix(selector, orientation) {
  const cellsCollection = document.querySelectorAll(
    `${selector} > [data-cell]`
  );
  let width = 0;
  let height = 0;

  cellsCollection.forEach((el) => {
    width = Math.max(el.dataset.cell.split(' ')[1], width);
    height = Math.max(el.dataset.cell.split(' ')[0], height);
  });

  // Убрал крайние бордеры

  function setBorderStyle(elements, style, value) {
    elements.forEach((el) => {
      el.style[style] = value;
    });
  }

  const top = document.querySelectorAll(`${selector} > [data-cell^="0 "]`);
  const right = document.querySelectorAll(
    `${selector} > [data-cell$=" ${width}"]`
  );
  const bottom = document.querySelectorAll(
    `${selector} > [data-cell^="${height} "]`
  );
  const left = document.querySelectorAll(`${selector} > [data-cell$=" 0"]`);

  setBorderStyle(top, 'borderTop', 'none');
  setBorderStyle(right, 'borderRight', 'none');
  setBorderStyle(bottom, 'borderBottom', 'none');
  setBorderStyle(left, 'borderLeft', 'none');

  // Разбиение полей на квадраты

  const firstLine = [4, 5];
  const step = 5;

  if (orientation === 'both' || orientation === 'cols') {
    for (let i = firstLine[0]; i < width; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell$=" ${i}"]`
      );
      setBorderStyle(cell, 'borderRight', '1.5px solid #313195');
    }
    for (let i = firstLine[1]; i < width; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell$=" ${i}"]`
      );
      setBorderStyle(cell, 'borderLeft', '1.5px solid #313195');
    }
  }

  if (orientation === 'both' || orientation === 'rows') {
    for (let i = firstLine[0]; i < height; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell^="${i}"]`
      );
      setBorderStyle(cell, 'borderBottom', '1.5px solid #313195');
    }
    for (let i = firstLine[1]; i < height; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell^="${i}"]`
      );
      setBorderStyle(cell, 'borderTop', '1.5px solid #313195');
    }
  }
}

splitMatrix('.top-clues', 'cols');
splitMatrix('.left-clues', 'rows');
splitMatrix('.crossword', 'both');

const modal = document.querySelector('.modal');

function gameOver() {
  setTimeout(() => {
    const modalImg = modal.querySelector('.modal__img');
    const modalResult = modal.querySelector('.modal__result');

    modalImg.src = './img/win.gif';
    modalResult.innerText = 'You Win!';

    modal.classList.add('show');
  }, 300);
}

// Сравнить матрицы

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length !== arr2[i].length) {
      return false;
    }

    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }
  console.log('равны');

  return gameOver();
}

const cells = document.querySelectorAll('.crossword > .cell');
crossword.addEventListener('click', (e) => {
  cells.forEach((cell) => {
    if (e.target === cell) {
      cell.classList.toggle('filled');
      const [x, y] = cell.dataset.cell.split(' ');
      if (!cell.classList.contains('filled')) {
        curMatrix[x][y] = 0;
      } else {
        curMatrix[x][y] = 1;
      }
      // console.log(curMatrix);
      areArraysEqual(curMatrix, template);
    }
  });
});

const resetBtn = document.querySelector('.modal__restart');
resetBtn.addEventListener('click', () => {
  crossword.innerHTML = '';
  leftClues.innerHTML = '';
  topClues.innerHTML = '';
  curMatrix = createCrossword(size, 30);
  result = calculateClues(template);
  createCluesPanel(calculateClues(template).rows, leftClues);
  createCluesPanel(calculateClues(template).cols, topClues);
  splitMatrix('.top-clues', 'cols');
  splitMatrix('.left-clues', 'rows');
  splitMatrix('.crossword', 'both');
  modal.classList.remove('show');
});

const complexites = Object.entries(templates);
const complexityBox = document.querySelector('.complexites');
let sizeCrossword = 5;
complexites.forEach((el, i) => {
  const textRadio =
    i === 0
      ? `<input type="radio" name="complexity" value="#0000ff" id="${el[0]}" checked />`
      : `<input type="radio" name="complexity" value="#0000ff" id="${el[0]}"/>`;

  complexityBox.insertAdjacentHTML(
    'beforeend',
    `${textRadio}
    <label for="${el[0]}" class="complexites__radio ${el[0]}" data-size="${sizeCrossword}">${el[0]}</label>`
  );
  sizeCrossword += 5;
});

const complexityInputs = document.querySelectorAll('.complexites__radio');
console.log(complexityInputs);
complexityInputs.forEach((el) => {
  el.addEventListener('click', () => {
    console.log(+el.dataset.size);
    size = +el.dataset.size;
    crossword.innerHTML = '';
    topClues.innerHTML = '';
    leftClues.innerHTML = '';
    const picture = Object.entries(templates[el.innerText])[0][1];
    console.log(picture);
    createCrossword(size, 30);
    createCluesPanel(calculateClues(picture).rows, leftClues);
    createCluesPanel(calculateClues(picture).cols, topClues);
  });
});

// const complexites = document.querySelectorAll('.complexites__radio');

// console.log(Object.entries(templates));
// complexites.forEach((el, i) => {
//   el.innerText = ;
// });
