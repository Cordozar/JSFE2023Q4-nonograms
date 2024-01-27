window.addEventListener('DOMContentLoaded', () => {
  const crossword = document.querySelector('.crossword');

  const template = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
  ];

  const size = 5;

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
        cell.classList.add('filled');
        const [x, y] = cell.dataset.cell.split('');
        matrix[x][y] = 1;
        areArraysEqual(matrix, template);
      }
    });
  });
});
