/**
 * Day 1 Exercise 3 (🔴 Challenge): ASI & Expression Statements
 * Instruction: Identify and fix the Automatic Semicolon Insertion (ASI) bug in the code below.
 */

"use strict";

// Problem: The function below attempts to return an object literal,
// but due to line break positioning, ASI causes it to return undefined.

function createStudentProfile() {
  // Demonstration of ASI bug: return followed by newline returns undefined
  return;
  // @ts-ignore
  ({ name: "Sophia", course: "Computer Science", year: 2026 });
}

// TODO: Refactor createStudentProfile so it correctly returns the object literal.
function createStudentProfileFixed() {
  return {
    name: "Sophia",
    course: "Computer Science",
    year: 2026
  };
}

console.log("Buggy Function Result:", createStudentProfile()); // Expected: undefined
console.log("Fixed Function Result:", createStudentProfileFixed()); // Expected: Object
