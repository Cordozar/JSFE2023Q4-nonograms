const crossword = document.querySelector('.crossword');

const size = 10;

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

function countClues(matrix) {
  const arrayCluesRows = [];
  const arrayCluesCols = [];

  let maxLengthRows = 0;
  let maxLengthCols = 0;

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
    rows: alignedArrayCluesRows,
    cols: rotateArrayCluesCols,
  };
}

const template = [
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  // [0, 1, 0, 0, 0],
  // [0, 1, 1, 1, 0],
  // [0, 1, 0, 1, 0],
  // [1, 1, 1, 1, 0],
  // [1, 1, 1, 1, 0],
];

const result = countClues(template);
console.log('Rows:', result.rows);
console.log('Columns:', result.cols);
// ____________________________________________
const matrix = [];
for (let i = 0; i < size; i += 1) {
  matrix[i] = [];
  for (let j = 0; j < size; j += 1) {
    matrix[i][j] = 0;
    const ceil = document.createElement('div');
    ceil.classList.add('cell');
    ceil.setAttribute('data-cell', `${i}${j}`);
    crossword.append(ceil);
  }
}

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

const cells = crossword.querySelectorAll('.cell');
crossword.addEventListener('click', (e) => {
  cells.forEach((cell) => {
    if (e.target === cell) {
      cell.classList.toggle('filled');
      const [x, y] = cell.dataset.cell.split('');
      if (!cell.classList.contains('filled')) {
        matrix[x][y] = 0;
      } else {
        matrix[x][y] = 1;
      }
      // console.log(matrix);
      areArraysEqual(matrix, template);
    }
  });
});
