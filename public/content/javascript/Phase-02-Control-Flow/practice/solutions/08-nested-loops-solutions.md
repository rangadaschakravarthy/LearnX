# Solutions — Practice Module 08 (Nested Loops)

```javascript
// Problem 1
function drawTriangle(rows) {
  const result = [];
  for (let i = 1; i <= rows; i++) {
    let rowStr = '';
    for (let j = 0; j < i; j++) {
      rowStr += '*';
    }
    result.push(rowStr);
  }
  return result;
}

// Problem 2
function drawInvertedTriangle(rows) {
  const result = [];
  for (let i = rows; i >= 1; i--) {
    let rowStr = '';
    for (let j = 0; j < i; j++) {
      rowStr += '*';
    }
    result.push(rowStr);
  }
  return result;
}

// Problem 3
function generateGrid(size, char) {
  const result = [];
  for (let i = 0; i < size; i++) {
    let rowStr = '';
    for (let j = 0; j < size; j++) {
      rowStr += char;
    }
    result.push(rowStr);
  }
  return result;
}

// Problem 4
function createMultiplicationGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push((r + 1) * (c + 1));
    }
    grid.push(row);
  }
  return grid;
}

// Problem 5
function getPrimesUpTo(n) {
  const primes = [];
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}

// Problem 6
function transposeMatrix(matrix) {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];
  for (let c = 0; c < cols; c++) {
    const newRow = [];
    for (let r = 0; r < rows; r++) {
      newRow.push(matrix[r][c]);
    }
    transposed.push(newRow);
  }
  return transposed;
}

// Problem 7
function drawPyramid(height) {
  const pyramid = [];
  for (let i = 0; i < height; i++) {
    let spaces = '';
    for (let s = 0; s < height - i - 1; s++) spaces += ' ';
    let stars = '';
    for (let st = 0; st < 2 * i + 1; st++) stars += '*';
    pyramid.push(spaces + stars);
  }
  return pyramid;
}

// Problem 8
function sum2DArray(matrix) {
  let sum = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      sum += matrix[r][c];
    }
  }
  return sum;
}

// Problem 9
function isIdentityMatrix(matrix) {
  const len = matrix.length;
  for (let r = 0; r < len; r++) {
    if (matrix[r].length !== len) return false;
    for (let c = 0; c < len; c++) {
      if (r === c && matrix[r][c] !== 1) return false;
      if (r !== c && matrix[r][c] !== 0) return false;
    }
  }
  return true;
}

// Problem 10
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// Problem 11
function bubbleSort(arr) {
  const sorted = [...arr];
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < sorted.length - 1 - i; j++) {
      if (sorted[j] > sorted[j + 1]) {
        let temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }
  return sorted;
}

// Problem 12
function drawDiamond(height) {
  const top = drawPyramid(height);
  const bottom = [];
  for (let i = height - 2; i >= 0; i--) {
    bottom.push(top[i]);
  }
  return [...top, ...bottom];
}

// Problem 13
function drawHollowSquare(size) {
  const lines = [];
  for (let r = 0; r < size; r++) {
    let line = '';
    for (let c = 0; c < size; c++) {
      if (r === 0 || r === size - 1 || c === 0 || c === size - 1) {
        line += '*';
      } else {
        line += ' ';
      }
    }
    lines.push(line);
  }
  return lines;
}

// Problem 14
function getRowSums(matrix) {
  const rowSums = [];
  for (let r = 0; r < matrix.length; r++) {
    let sum = 0;
    for (let c = 0; c < matrix[r].length; c++) {
      sum += matrix[r][c];
    }
    rowSums.push(sum);
  }
  return rowSums;
}

// Problem 15
function drawCheckerboard(rows, cols) {
  const board = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      line += (r + c) % 2 === 0 ? 'X' : 'O';
    }
    board.push(line);
  }
  return board;
}
```
