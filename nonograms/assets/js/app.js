const size = 15;
const sizeCells = 30;

const template = [
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],

  // [0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
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

  // [0, 1, 0, 0, 0],
  // [0, 1, 1, 1, 0],
  // [0, 1, 0, 1, 1],
  // [1, 1, 1, 1, 0],
  // [1, 1, 1, 1, 0],
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

const curMatrix = createCrossword(size, 30);

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
console.log(template);

const result = calculateClues(template);
console.log('Rows:', result.rows);
console.log('Columns:', result.cols);

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
      setBorderStyle(cell, 'borderRight', '1px solid red');
    }
    for (let i = firstLine[1]; i < width; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell$=" ${i}"]`
      );
      setBorderStyle(cell, 'borderLeft', '1px solid red');
    }
  }

  if (orientation === 'both' || orientation === 'rows') {
    for (let i = firstLine[0]; i < height; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell^="${i}"]`
      );
      setBorderStyle(cell, 'borderBottom', '1px solid red');
    }
    for (let i = firstLine[1]; i < height; i += step) {
      const cell = document.querySelectorAll(
        `${selector} > [data-cell^="${i}"]`
      );
      setBorderStyle(cell, 'borderTop', '1px solid red');
    }
  }
}

splitMatrix('.top-clues', 'cols');
splitMatrix('.left-clues', 'rows');
splitMatrix('.crossword', 'both');

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

  return console.log('равны');
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
