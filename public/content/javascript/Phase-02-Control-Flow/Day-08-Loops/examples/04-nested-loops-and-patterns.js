/**
 * Day 8 Example 4: Nested Loops & Pattern Printing
 * Run with Node.js: node 04-nested-loops-and-patterns.js
 */

"use strict";

console.log("==========================================");
console.log("4. Nested Loops & Pattern Printing");
console.log("==========================================");

// 1. Grid Pattern (3x3 Matrix)
console.log("3x3 Matrix Output:");
for (let r = 1; r <= 3; r++) {
  let rowStr = "";
  for (let c = 1; c <= 3; c++) {
    rowStr += `[${r},${c}] `;
  }
  console.log(rowStr);
}

// 2. Right-Angled Star Triangle
console.log("\nStar Triangle Pattern:");
const numRows = 5;
for (let i = 1; i <= numRows; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "*";
  }
  console.log(line);
}
