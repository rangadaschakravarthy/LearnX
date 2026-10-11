# Solutions — Practice Module 07 (`while` and `do...while` Loops)

```javascript
// Problem 1
function countDigits(n) {
  if (n === 0) return 1;
  let count = 0;
  let current = Math.abs(n);
  while (current > 0) {
    count++;
    current = Math.floor(current / 10);
  }
  return count;
}

// Problem 2
function sumDigits(n) {
  let sum = 0;
  let current = Math.abs(n);
  while (current > 0) {
    sum += current % 10;
    current = Math.floor(current / 10);
  }
  return sum;
}

// Problem 3
function reverseInteger(n) {
  let reversed = 0;
  let current = Math.abs(n);
  while (current > 0) {
    reversed = reversed * 10 + (current % 10);
    current = Math.floor(current / 10);
  }
  return n < 0 ? -reversed : reversed;
}

// Problem 4
function isPalindromeNumber(n) {
  if (n < 0) return false;
  return n === reverseInteger(n);
}

// Problem 5
function collatzLength(n) {
  let steps = 0;
  let current = n;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  return steps;
}

// Problem 6
function findGCD(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    let temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

// Problem 7
function findLCM(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / findGCD(a, b);
}

// Problem 8
function validatePasswordSimulation(attempts) {
  let idx = 0;
  let isValid = false;
  do {
    if (attempts[idx] === "secret123") {
      isValid = true;
      break;
    }
    idx++;
  } while (idx < attempts.length);
  return isValid ? "ACCESS GRANTED" : "ACCESS DENIED";
}

// Problem 9
function toBinaryString(n) {
  if (n === 0) return "0";
  let binary = "";
  let current = n;
  while (current > 0) {
    binary = (current % 2) + binary;
    current = Math.floor(current / 2);
  }
  return binary;
}

// Problem 10
function integerSquareRoot(n) {
  if (n < 0) return NaN;
  let i = 0;
  while ((i + 1) * (i + 1) <= n) {
    i++;
  }
  return i;
}

// Problem 11
function simulateAtmPin(inputPins, correctPin) {
  let tries = 0;
  let success = false;
  do {
    if (inputPins[tries] === correctPin) {
      success = true;
      break;
    }
    tries++;
  } while (tries < 3 && tries < inputPins.length);
  return success ? "UNLOCKED" : "LOCKED OUT";
}

// Problem 12
function countGuessesToTarget(target, stepSize) {
  let current = 0;
  let count = 0;
  while (current < target) {
    current += stepSize;
    count++;
  }
  return count;
}

// Problem 13
function isPowerOfTwoWhile(n) {
  if (n <= 0) return false;
  let current = n;
  while (current > 1) {
    if (current % 2 !== 0) return false;
    current = current / 2;
  }
  return true;
}

// Problem 14
function yearsToDoubleInvestment(principal, annualRate) {
  let years = 0;
  let current = principal;
  const target = principal * 2;
  while (current < target) {
    current += current * (annualRate / 100);
    years++;
  }
  return years;
}

// Problem 15
function findSubstringPointer(text, pattern) {
  if (pattern.length === 0) return 0;
  let i = 0;
  while (i <= text.length - pattern.length) {
    let match = true;
    let j = 0;
    while (j < pattern.length) {
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
      j++;
    }
    if (match) return i;
    i++;
  }
  return -1;
}
```
