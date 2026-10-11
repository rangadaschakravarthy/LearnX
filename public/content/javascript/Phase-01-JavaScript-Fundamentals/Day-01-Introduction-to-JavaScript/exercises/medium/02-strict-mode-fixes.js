/**
 * Day 1 Exercise 2 (🟡 Medium): Strict Mode Debugging
 * Instruction: Fix the broken non-strict code below so that it executes cleanly under "use strict".
 */

"use strict";

// Fix Problem 1: Undeclared variable assignment
// Broken code: score = 100;
// Write fixed line below:
let score = 100;

// Fix Problem 2: Function with duplicate parameter names
// Broken code: function calculateTotal(price, price) { return price + price; }
// Write fixed function below:
function calculateTotal(basePrice, taxPrice) {
  return basePrice + taxPrice;
}

// Fix Problem 3: Attempting to delete an unconfigurable variable
let developerName = "Alex";
// Broken code: delete developerName;
// Explain why delete developerName is invalid under strict mode in a comment below:
// Explanation: 

console.log("Score:", score);
console.log("Total:", calculateTotal(100, 15));
console.log("Developer:", developerName);
