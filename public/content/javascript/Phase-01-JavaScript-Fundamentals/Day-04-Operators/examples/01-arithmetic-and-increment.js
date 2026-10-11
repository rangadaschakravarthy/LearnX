/**
 * Day 4 Example 1: Arithmetic & Prefix vs Postfix Increment Operators
 * Run with Node.js: node 01-arithmetic-and-increment.js
 */

console.log("==========================================");
console.log("1. Arithmetic & Increment Showcase");
console.log("==========================================");

// 1. Basic Arithmetic
console.log("Addition (10 + 5):", 10 + 5);
console.log("Exponentiation (2 ** 4):", 2 ** 4);
console.log("Modulus Remainder (10 % 3):", 10 % 3);

// 2. Prefix vs Postfix Increment
let a = 10;
let b = a++; // Postfix: b gets 10, then a becomes 11
console.log("\nPostfix Evaluation:");
console.log("a value after a++:", a); // 11
console.log("b value (captured before increment):", b); // 10

let x = 10;
let y = ++x; // Prefix: x becomes 11 immediately, y gets 11
console.log("\nPrefix Evaluation:");
console.log("x value after ++x:", x); // 11
console.log("y value (captured after increment):", y); // 11

// 3. Combined Increment Expression Puzzle
let p = 5;
let puzzleResult = p++ + ++p; // (5) + (7) = 12
console.log("\nIncrement Puzzle (p++ + ++p where p=5):", puzzleResult);
