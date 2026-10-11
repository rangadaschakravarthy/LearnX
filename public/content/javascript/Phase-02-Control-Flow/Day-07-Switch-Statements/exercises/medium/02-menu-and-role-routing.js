/**
 * Day 7 Exercise 2 (🟡 Medium): Calculator Operation Dispatcher
 * Instruction: Implement calculate(a, b, op) using switch on op ("+", "-", "*", "/").
 */

"use strict";

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Cannot divide by zero" : a / b;
    default:
      return "Invalid operator";
  }
}

console.log("10 + 5:", calculate(10, 5, "+"));
console.log("10 / 0:", calculate(10, 0, "/"));
console.log("10 * 3:", calculate(10, 3, "*"));
