/**
 * Day 8 Exercise 1 (🟢 Easy): Basic Loop Iteration
 * Instruction: Complete functions using for and while loops.
 */

"use strict";

// TODO 1: Write a function printNumbers(n) that logs numbers from 1 to n using a for loop.
function printNumbers(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}

// TODO 2: Write a function calculateFactorial(n) that returns n! using a while loop. (e.g. 5! = 5*4*3*2*1 = 120).
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
