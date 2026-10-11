/**
 * Day 6 Example 1: Basic if / else & Expression Conditions
 * Run with Node.js: node 01-basic-if-else-expressions.js
 */

"use strict";

console.log("==========================================");
console.log("1. Basic if / else Showcase");
console.log("==========================================");

// 1. Single Branch (if only)
const userScore = 85;
const PASSING_SCORE = 70;

if (userScore >= PASSING_SCORE) {
  console.log(`✅ Exam Passed! Score: ${userScore}/${PASSING_SCORE}`);
}

// 2. Dual Branch (if ... else)
const userAge = 16;

if (userAge >= 18) {
  console.log("Access Granted: Adult Account");
} else {
  console.log("Access Restricted: Underage Account");
}

// 3. Expression Conditions inside if
const cartTotal = 120;
const hasCoupon = true;

if (cartTotal > 100 && hasCoupon) {
  console.log("Discount Applied: $20 off!");
}
