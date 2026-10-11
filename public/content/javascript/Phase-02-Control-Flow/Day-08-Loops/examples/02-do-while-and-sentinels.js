/**
 * Day 8 Example 2: do...while Loops & Sentinel Input Processing
 * Run with Node.js: node 02-do-while-and-sentinels.js
 */

"use strict";

console.log("==========================================");
console.log("2. do...while & Sentinel Processing");
console.log("==========================================");

// 1. do...while (Executes at least ONCE even if condition is false)
let initialVal = 100;

do {
  console.log(`do...while executed body with initialVal = ${initialVal}`);
  initialVal++;
} while (initialVal < 5); // 101 < 5 is false!

// 2. Sentinel Loop Processing
const incomingDataStream = [15, 30, 45, -999, 100]; // -999 is sentinel END signal
let index = 0;

console.log("\nProcessing Sentinel Stream:");
while (incomingDataStream[index] !== -999) {
  console.log(`Stream item ${index + 1}: ${incomingDataStream[index]}`);
  index++;
}
console.log("Sentinel -999 reached. Stream processing terminated.");
