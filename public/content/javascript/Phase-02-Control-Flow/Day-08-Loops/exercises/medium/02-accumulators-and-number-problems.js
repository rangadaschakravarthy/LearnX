/**
 * Day 8 Exercise 2 (🟡 Medium): Digit Operations
 * Instruction: Implement reverseNumber(num) and sumDigits(num) using loops.
 */

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

console.log("Sum of digits in 1234:", sumDigits(1234)); // 10
console.log("Is 121 palindrome?:", isPalindromeNumber(121)); // true
console.log("Is 123 palindrome?:", isPalindromeNumber(123)); // false
