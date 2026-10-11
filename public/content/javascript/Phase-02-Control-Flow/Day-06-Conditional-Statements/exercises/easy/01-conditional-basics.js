/**
 * Day 6 Exercise 1 (🟢 Easy): Basic Conditionals & Ternary
 * Instruction: Implement functions following instructions.
 */

"use strict";

// TODO 1: Write a function isEvenOrOdd(num) that returns "Even" if divisible by 2, else "Odd".
function isEvenOrOdd(num) {
  // Write code below:
  return num % 2 === 0 ? "Even" : "Odd";
}

// TODO 2: Write a function checkNumberSign(num) returning "Positive", "Negative", or "Zero".
function checkNumberSign(num) {
  // Write code below:
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}

console.log("10 is:", isEvenOrOdd(10));
console.log("-5 sign:", checkNumberSign(-5));
