/**
 * Day 4 Exercise 3 (🔴 Challenge): Complex Operator Precedence Puzzle
 * Instruction: Predict the output of the complex expression evaluation below.
 */

"use strict";

let a = 2;
let b = 3;
let c = 4;

// Expression: a++ + ++b * c-- / 2
// Step 1: a++ evaluates to 2 (a becomes 3)
// Step 2: ++b increments b from 3 to 4, evaluates to 4
// Step 3: c-- evaluates to 4 (c becomes 3)
// Step 4: ++b * c-- => 4 * 4 = 16
// Step 5: 16 / 2 = 8
// Step 6: a++ + 8 => 2 + 8 = 10

const result = a++ + ++b * c-- / 2;

console.log("Result:", result); // Expected: 10
console.log("Final a:", a); // Expected: 4
console.log("Final b:", b); // Expected: 4
console.log("Final c:", c); // Expected: 3
