# Solutions — Practice Module 06 (Traditional for Loops)

```javascript
// Problem 1
function sumToN(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

// Problem 2
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Problem 3
function getEvensUpTo(n) {
  const evens = [];
  for (let i = 0; i <= n; i += 2) {
    evens.push(i);
  }
  return evens;
}

// Problem 4
function generateCountdown(start) {
  const countdown = [];
  for (let i = start; i >= 0; i--) {
    countdown.push(i);
  }
  return countdown;
}

// Problem 5
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Problem 6
function getMultiplicationTable(num, limit) {
  const table = [];
  for (let i = 1; i <= limit; i++) {
    table.push(`${num} x ${i} = ${num * i}`);
  }
  return table;
}

// Problem 7
function countChar(str, target) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === target) count++;
  }
  return count;
}

// Problem 8
function findMaxArray(arr) {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// Problem 9
function reverseArrayManual(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

// Problem 10
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

// Problem 11
function toAlternateCase(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    res += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return res;
}

// Problem 12
function sumExcludeMultiplesOfThree(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0) continue;
    total += i;
  }
  return total;
}

// Problem 13
function findFirstIndex(arr, target) {
  let idx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      idx = i;
      break;
    }
  }
  return idx;
}

// Problem 14
function getPowersOfTwo(count) {
  const powers = [];
  let val = 1;
  for (let i = 0; i < count; i++) {
    powers.push(val);
    val *= 2;
  }
  return powers;
}

// Problem 15
function countFrequency(arr, val) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) count++;
  }
  return count;
}
```
