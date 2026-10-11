/**
 * Day 8 Example 1: basic for & while Loops
 * Run with Node.js: node 01-for-and-while-loops.js
 */

"use strict";

console.log("==========================================");
console.log("1. for & while Loops Showcase");
console.log("==========================================");

// 1. Basic for loop (1 to 5)
console.log("Counting 1 to 5 with for loop:");
for (let i = 1; i <= 5; i++) {
  console.log(`for iteration i = ${i}`);
}

// 2. Accumulator Sum Pattern with for loop
let totalSum = 0;
for (let i = 1; i <= 10; i++) {
  totalSum += i;
}
console.log("\nSum of 1 to 10:", totalSum); // 55

// 3. while loop (Countdown 5 to 1)
console.log("\nCountdown 5 to 1 with while loop:");
let count = 5;
while (count > 0) {
  console.log(`while count = ${count}`);
  count--;
}
