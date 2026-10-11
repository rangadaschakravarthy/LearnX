/**
 * Day 8 Example 3: break & continue Control Statements
 * Run with Node.js: node 03-break-continue-examples.js
 */

"use strict";

console.log("==========================================");
console.log("3. break & continue Showcase");
console.log("==========================================");

// 1. break Example: Exit search loop early
const targetNumber = 7;
console.log(`Searching for ${targetNumber} in numbers 1 to 10:`);

for (let i = 1; i <= 10; i++) {
  if (i === targetNumber) {
    console.log(`🎯 Target ${targetNumber} found at iteration ${i}! Breaking loop.`);
    break;
  }
  console.log(`Checked ${i}...`);
}

// 2. continue Example: Skip multiples of 3
console.log("\nPrinting numbers 1 to 10 except multiples of 3:");
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    console.log(`Skipping multiple of 3: ${i}`);
    continue;
  }
  console.log(`Number: ${i}`);
}
