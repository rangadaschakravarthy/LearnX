# Day 08 Exercises Solutions

## Exercise 1 (🟢 Easy): Basic Loop Iteration
```javascript
"use strict";

function printNumbers(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}

function calculateFactorial(n) {
  let fact = 1;
  let i = n;
  while (i > 1) {
    fact *= i;
    i--;
  }
  return fact;
}

console.log("5! =", calculateFactorial(5));
```

---

## Exercise 2 (🟡 Medium): Digit Accumulators
```javascript
"use strict";

function sumDigits(num) {
  let temp = Math.abs(num);
  let sum = 0;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  return sum;
}

function isPalindromeNumber(num) {
  const original = num;
  let temp = Math.abs(num);
  let reversed = 0;
  while (temp > 0) {
    reversed = (reversed * 10) + (temp % 10);
    temp = Math.floor(temp / 10);
  }
  return original === reversed;
}

console.log("Sum of digits in 1234:", sumDigits(1234));
console.log("Is 121 palindrome?:", isPalindromeNumber(121));
```

---

## Exercise 3 (🔴 Challenge): Primes & Pyramid Pattern
```javascript
"use strict";

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function printPyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let spaces = " ".repeat(rows - i);
    let stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
  }
}

console.log("Is 17 prime?:", isPrime(17));
printPyramid(4);
```
