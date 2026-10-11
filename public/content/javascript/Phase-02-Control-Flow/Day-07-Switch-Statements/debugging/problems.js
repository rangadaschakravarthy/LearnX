/**
 * Day 7 Debugging Problems
 * Identify bugs in switch statements and correct them!
 */

"use strict";

// Problem 1: Accidental Fall-Through
function getLevelDescription(level) {
  let result = "";
  switch (level) {
    case 1:
      result += "Beginner "; // BUG: Missing break!
    case 2:
      result += "Intermediate "; // BUG: Missing break!
    case 3:
      result += "Advanced";
      break;
  }
  return result;
}

// Problem 2: Type Coercion Misunderstanding
function checkStatus(code) {
  switch (code) {
    case 200: // BUG: Passing string "200" never matches number 200!
      return "OK";
    default:
      return "Unknown";
  }
}

console.log("Bug 1 Test (Level 1):", getLevelDescription(1)); // Expected: "Beginner"
console.log("Bug 2 Test (Code '200'):", checkStatus("200")); // Expected: "OK"
