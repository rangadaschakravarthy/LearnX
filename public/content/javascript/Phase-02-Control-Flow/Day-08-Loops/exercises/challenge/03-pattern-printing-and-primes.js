/**
 * Day 8 Exercise 3 (🔴 Challenge): Prime Number Verification & Pyramid Patterns
 * Instruction: Implement isPrime(num) and printPyramid(rows).
 */

"use strict";

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function printPyramid(rows) {
  console.log(`Printing Pyramid of ${rows} rows:`);
  for (let i = 1; i <= rows; i++) {
    let spaces = " ".repeat(rows - i);
    let stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
  }
}

console.log("Is 17 prime?:", isPrime(17)); // true
console.log("Is 20 prime?:", isPrime(20)); // false
printPyramid(4);
